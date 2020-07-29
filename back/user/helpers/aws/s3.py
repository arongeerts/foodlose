import boto3

from config import Config


class S3:
    def __init__(self):
        config = Config()
        endpoint = config.get("S3_ENDPOINT")
        region = config.get("AWS_REGION")
        params = {}
        if config.env == "local":
            params = {
                'aws_access_key_id': 'foo',
                'aws_secret_access_key': 'bar',
                'region_name': region,
                'endpoint_url': endpoint
            }
        self.client = boto3.client('s3', **params)

    def save(self, bucket: str, key: str, body: bytes, acl: str = 'private'):
        self.client.put_object(
            Body=body,
            Bucket=bucket,
            Key=key,
            ACL=acl
        )
