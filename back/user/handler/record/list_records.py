import datetime
import json

from handler.wrapper import handler, must_authenticate
from repositories.record import RecordRepository


@handler
@must_authenticate
def main(event, context):
    user_id = event.get("pathParameters", {}).get("user_id")

    query = event.get("queryStringParameters") or {}
    from_date = query.get("record_date_from", datetime.date.min)
    to_date = query.get("record_date_to", datetime.date.max)

    records = RecordRepository().list(user_id, from_date=from_date, to_date=to_date)

    output = list(map(lambda r: r.dict(), records))

    return {
        "statusCode": 200,
        "body": json.dumps(output)
    }
