import json

from exceptions import RecordNotExistsException
from handler.wrapper import handler, must_authenticate
from repositories.record import RecordRepository


@handler
@must_authenticate
def main(event, context):
    try:
        params = json.loads(event["pathParameters"])
        user_id = params.get("user_id")
        record_date = params.get("record_date")

        record = RecordRepository().get(user_id, record_date)

        return {
            "statusCode": 200,
            "body": record.json()
        }
    except RecordNotExistsException:
        return {
            "statusCode": 404,
            "body": json.dumps({"detail": "Record not found"})
        }
