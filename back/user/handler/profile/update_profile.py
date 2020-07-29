import json

from exceptions import ProfileNotExistsException
from handler.wrapper import handler, must_authenticate
from model.profile import ProfileUpdate
from repositories.profile import ProfileRepository


@handler
@must_authenticate
def main(event, context):
    try:
        user_id = event.get("pathParameters", {}).get("user_id")
        profile_update = ProfileUpdate(**json.loads(event["body"]), user_id=user_id)

        repo = ProfileRepository()
        profile = repo.get(user_id)

        repo.update(profile, profile_update)

        return {
            "statusCode": 200,
            "body": json.dumps({"status": "Updated"})
        }
    except ProfileNotExistsException:
        return {
            "statusCode": 404,
            "body": json.dumps({"detail": "User profile not found"})
        }
