import json

from auth.controller import Authenticator
from exceptions import AuthorizationException, ProfileNotExistsException
from handler.wrapper import handler
from model.login import Login
from repositories.profile import ProfileRepository


@handler
def main(event, context):

    try:
        login = Login(**json.loads(event['body']))

        profile = ProfileRepository().get_by_email(login.email)

        auth = Authenticator()

        auth.validate_password(login.password, profile.password_hash)
        token = auth.generate_token(profile.user_id, profile.role)

        return {
            "statusCode": 200,
            "body": json.dumps({"token": token})
        }

    except ProfileNotExistsException:
        # No difference in handling profile not exists or unauthorized
        raise AuthorizationException()
