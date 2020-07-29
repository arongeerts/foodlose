import json

from exceptions import RecordNotExistsException
from handler.wrapper import must_authenticate, handler
from repositories.record import RecordRepository


@handler
@must_authenticate
def main(event, context):
    try:
        params = event.get("pathParameters", {})
        user_id = params.get("user_id")
        record_date = params.get("record_date")

        RecordRepository().delete(user_id, record_date)

        return {
            "statusCode": 200,
            "body": json.dumps({"status": "Deleted"})
        }

    except RecordNotExistsException:
        return {
            "statusCode": 404,
            "body": json.dumps({"detail": "Record not found"})
        }
