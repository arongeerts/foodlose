import json

from handler.wrapper import handler, must_be_admin
from repositories.profile import ProfileRepository


@handler
@must_be_admin
def main(event, context):
    profiles = ProfileRepository().list()

    output = list(map(lambda p: p.dict(), profiles))

    return {
        "statusCode": 200,
        "body": json.dumps(output),
    }
