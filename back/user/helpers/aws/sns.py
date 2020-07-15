import json

import boto3


class SNS:
    def __init__(self):
        self.client = boto3.client('sns')

    def publish(self, topic_arn: str, message: dict):
        self.client.publish(Message=json.dumps(message), TopicArn=topic_arn)
