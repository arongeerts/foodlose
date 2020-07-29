import unittest

from moto import mock_secretsmanager

from auth.controller import Authenticator, ADMIN_ROLE
from exceptions import AuthorizationException
from helpers import password_helper


@mock_secretsmanager
class TestAuthentication(unittest.TestCase):
    authenticator = None

    @classmethod
    def setUpClass(cls):
        cls.authenticator = Authenticator()

    def test_authenticate_admin(self):
        token = self.authenticator.generate_token('a-user', ADMIN_ROLE)
        assert self.authenticator.authenticate_admin(token)

    def test_validate_password(self):
        password = 'MY-super-$ecr3t-p@$$w0rd'
        hashed = password_helper.encrypt(password)
        assert self.authenticator.validate_password(password, hashed)

    def test_authenticate(self):
        token = self.authenticator.generate_token('a-user', 'USER')
        assert self.authenticator.authenticate(token, 'a-user')

    def test_user_authenticate_fails_as_admin(self):
        token = self.authenticator.generate_token('a-user', 'USER')
        self.assertRaises(AuthorizationException, self.authenticator.authenticate_admin, token)

    def test_user_authenticate_fails_as_other_user(self):
        token = self.authenticator.generate_token('a-user', 'USER')
        self.assertRaises(AuthorizationException, self.authenticator.authenticate, token, 'other-user')

    def test_password_encoding(self):
        password = 'MY-super-$ecr3t-p@$$w0rd'
        h = password_helper.encrypt(password)
        h = h.decode('utf-8')
        assert password_helper.validate(password, h)
