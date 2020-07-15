import json

from handler.wrapper import handler, must_authenticate
from model.record import Record
from repositories.record import RecordRepository


@handler
@must_authenticate
def main(event, context):
    user_id = event.get("pathParameters", {}).get("user_id")
    record = Record(**json.loads(event["body"]))

    RecordRepository().save(user_id, record)

    return {
        "statusCode": 200,
        "body": json.dumps({"status": "Created"})
    }
