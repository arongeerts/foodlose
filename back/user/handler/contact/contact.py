import json

from config import Config
from handler.wrapper import handler
from helpers.aws.sns import SNS
from model.contact import ContactMessage


@handler
def main(event, context):
    topic = Config().get("SNS_CONTACT_TOPIC")
    message = ContactMessage(**json.loads(event['body']))

    SNS().publish(topic_arn=topic, message=dict(message))
    return {
        "statusCode": 200,
        "body": json.dumps("OK")
    }
