import datetime

import jwt

from helpers import password_helper
from helpers.aws.secrets_manager import SecretsManager
from exceptions import AuthorizationException, TokenExpiredException

TOKEN_VALIDITY_INTERVAL = datetime.timedelta(days=1)
ADMIN_ROLE = 'ADMIN'


class Authenticator:
    instance = None

    class __Authenticator:
        def __init__(self):
            self.admin_secret = SecretsManager().get_admin_secret()

        @staticmethod
        def validate_password(password: str, hashed: str) -> bool:
            if password_helper.validate(password, hashed):
                return True
            raise AuthorizationException()

        def authenticate_admin(self, token: str) -> bool:
            return self.authenticate(token, ADMIN_ROLE)

        def authenticate(self, token: str, user_id: str) -> bool:
            try:
                if type(token) not in [str, bytes]:
                    raise AuthorizationException()
                data = jwt.decode(token.encode('utf-8'), self.admin_secret, algorithms='HS256')
                if datetime.datetime.fromtimestamp(data['exp']) < datetime.datetime.now():
                    raise TokenExpiredException()
                if data['user_id'] == user_id or data['role'] == ADMIN_ROLE:
                    return True
                raise AuthorizationException()
            except jwt.exceptions.InvalidSignatureError:
                raise AuthorizationException()

        def generate_token(self, user_id: str, role: str = 'USER') -> str:
            expiration = datetime.datetime.now() + TOKEN_VALIDITY_INTERVAL

            return jwt.encode({'user_id': user_id, 'exp': expiration, 'role': role},
                              self.admin_secret,
                              algorithm='HS256').decode('utf-8')

    def __init__(self):
        if not self.instance:
            self.instance = self.__Authenticator()

    def authenticate_admin(self, token: str) -> bool:
        return self.instance.authenticate_admin(token)

    def validate_password(self, password: str, hashed: str) -> bool:
        return self.instance.validate_password(password, hashed)

    def authenticate(self, token: str, user_id: str) -> bool:
        return self.instance.authenticate(token, user_id)

    def generate_token(self, user_id: str, role: str) -> str:
        return self.instance.generate_token(user_id, role)
