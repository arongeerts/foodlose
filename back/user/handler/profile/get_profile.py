import json

from exceptions import ProfileNotExistsException
from handler.wrapper import must_authenticate, handler
from repositories.profile import ProfileRepository


@handler
@must_authenticate
def main(event, context):
    try:
        user_id = event.get("pathParameters", {}).get("user_id")

        profile = ProfileRepository().get(user_id)

        output = profile.to_output()

        return {
            "statusCode": 200,
            "body": output.json()
        }
    except ProfileNotExistsException:
        return {
            "statusCode": 404,
            "body": json.dumps({"detail": "User not found"})
        }
