import json

from exceptions import ProfileNotExistsException
from handler.wrapper import handler, must_be_admin
from model.profile import ProfileInput
from repositories.profile import ProfileRepository


@handler
@must_be_admin
def main(event, context):
    profile_input = ProfileInput(**json.loads(event["body"]))

    try:
        # If the profile does not exist, this will raise an exception
        ProfileRepository().get_by_email(profile_input.email)

        return {
            "statusCode": 409,
            "body": json.dumps({"detail": "Email already in use"})
        }
    except ProfileNotExistsException:
        ProfileRepository().save(profile_input.to_storage())

        return {
            "statusCode": 200,
            "body": json.dumps({"detail": "Profile for {} created".format(profile_input.email)})
        }
