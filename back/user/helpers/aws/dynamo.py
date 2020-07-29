from typing import List

import boto3
import time
from botocore.exceptions import ClientError

from config import Config


class DynamoDB:
    def __init__(self):
        config = Config()
        endpoint = config.get("DYNAMODB_ENDPOINT")
        region = config.get("AWS_REGION")
        creds = {}
        params = {'region_name': region, 'endpoint_url': endpoint}
        if config.env == "local":
            creds = {'aws_access_key_id': 'foo', 'aws_secret_access_key': 'bar'}
        self.client = boto3.client("dynamodb", **params, **creds)
        self.resource = boto3.resource("dynamodb", **params, **creds)

    def put_item(self, table, item):
        print("putting item {} in table {}".format(item, table))
        self.client.put_item(Item=item, TableName=table)

    def get_item(self, table, key):
        print("getting item with key {} from table {}".format(key, table))
        return self.client.get_item(Key=key, TableName=table).get("Item")

    def delete_item(self, table, key):
        print("deleting item with key {} from table {}".format(key, table))
        return self.client.delete_item(Key=key, TableName=table)

    def query_by_key(self, table, key_name, key_value, condition=None, condition_attributes=None, sort_asc: bool=True, limit: int=None, offset: dict=None):
        print("getting all items with key {}={} from table {}. "
              "Condition '{}', with attributes {}".format(key_name, key_value, table, condition, condition_attributes))
        params = {
            "ExpressionAttributeValues": {
                ":key_value": {"S": "{}".format(key_value)}
            },
            "TableName": table,
            "ScanIndexForward": sort_asc
        }
        if limit:
            params["Limit"] = limit
        if offset:
            params["ExclusiveStartKey"] = offset
        key_condition = "{} = :key_value ".format(key_name)
        if condition:
            key_condition += condition
            if condition_attributes:
                params["ExpressionAttributeValues"] = {**params["ExpressionAttributeValues"],
                                                       **condition_attributes}
        params["KeyConditionExpression"] = key_condition

        items = []
        query_response = self.client.query(**params)
        items.extend(query_response.get("Items", []))
        back_off_time = 0.2
        while "LastEvaluatedKey" in query_response:
            try:
                params["ExclusiveStartKey"] = query_response["LastEvaluatedKey"]
                query_response = self.client.query(**params)
                items.extend(query_response.get("Items", []))
            except ClientError as e:
                if (
                        e.response["Error"]["Code"]
                        == "ProvisionedThroughputExceededException"
                ):
                    time.sleep(back_off_time)
                    back_off_time *= 2
                else:
                    raise e

        return items

    def scan(self, table: str, attributes: List[str]):
        print("Scanning table {} and returning attributes {}".format(table, attributes))
        params = {
            "ProjectionExpression": "{}".format(",".join(list(map(lambda a: f"#{a}", attributes)))),
            "ExpressionAttributeNames": {f"#{a}": a for a in attributes},
            "TableName": table
        }

        items = []
        scan_response = self.client.scan(**params)
        items.extend(scan_response.get("Items", []))
        back_off_time = 0.2
        while "LastEvaluatedKey" in scan_response:
            try:
                params["ExclusiveStartKey"] = scan_response["LastEvaluatedKey"]
                scan_response = self.client.scan(**params)
                items.extend(scan_response.get("Items", []))
            except ClientError as e:
                if (
                        e.response["Error"]["Code"]
                        == "ProvisionedThroughputExceededException"
                ):
                    time.sleep(back_off_time)
                    back_off_time *= 2
                else:
                    raise e

        return items

    def get_item_by_index(self, table, key, index):
        print("Getting item from table {} for key {} with index {}".format(table, key, index))
        key, value = list(key.items())[0]
        params = {
            "IndexName": index,
            "KeyConditionExpression": "{} = :s".format(key),
            "ExpressionAttributeValues": {":s": value},
            "TableName": table
        }

        items = []
        query_response = self.client.query(**params)
        items.extend(query_response.get("Items", []))
        back_off_time = 0.2
        while "LastEvaluatedKey" in query_response:
            try:
                params["ExclusiveStartKey"] = query_response["LastEvaluatedKey"]
                query_response = self.client.query(**params)
                items.extend(query_response.get("Items", []))
            except ClientError as e:
                if (
                        e.response["Error"]["Code"]
                        == "ProvisionedThroughputExceededException"
                ):
                    time.sleep(back_off_time)
                    back_off_time *= 2
                else:
                    raise e

        if len(items) > 0:
            return items[0]
