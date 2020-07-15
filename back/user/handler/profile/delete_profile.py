import json

from exceptions import ProfileNotExistsException
from handler.wrapper import handler, must_authenticate
from repositories.profile import ProfileRepository


@handler
@must_authenticate
def main(event, context):
    try:
        user_id = event.get("pathParameters", {}).get("user_id")

        # Will throw an exception if the profile does not exist
        ProfileRepository().get(user_id)

        ProfileRepository().delete(user_id)

        return {
            "statusCode": 200,
            "body": json.dumps({"status": "Deleted"})
        }
    except ProfileNotExistsException:
        return {
            'statusCode': 404,
            "body": json.dumps({"detail": "Profile does not exist"})
        }

