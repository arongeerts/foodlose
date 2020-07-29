import datetime
import os
import unittest

import jwt

import tests.integration.test_helpers as helpers
from tests.integration.client import TestClient


class TestProfiles(unittest.TestCase):
    URL = ''
    SECRET = ''

    admin_client = None
    test_client = None
    admin_profile = None
    user_profile = None

    @classmethod
    def setUpClass(cls):
        cls.URL = os.environ['FOODLOSE_URL']
        secret = os.environ['FOODLOSE_SECRET']

        user = 'test-admin'
        token = jwt.encode({'user_id': user, 'exp': datetime.datetime.max, 'role': 'ADMIN'},
                           secret,
                           algorithm='HS256')
        initial_client = TestClient(cls.URL, '', '')
        initial_client.set_user(token, user)
        cls.admin_profile = helpers.get_new_admin_profile()
        initial_client.create_profile(cls.admin_profile)

        admin_email = cls.admin_profile["email"]
        admin_password = cls.admin_profile["password"]

        # login admin
        cls.admin_client = init_client(cls.URL, admin_email, admin_password)
        cls.user_profile = helpers.get_new_profile()
        response = cls.admin_client.create_profile(
            cls.user_profile
        )
        assert response.status_code == 200
        cls.test_client = init_client(cls.URL, cls.user_profile['email'], cls.user_profile['password'])

    def test_get_profile_from_admin(self):
        response = self.admin_client.get_profile(self.test_client.user_id)
        self.__assert_get_profile(response, self.user_profile)

    def test_get_profile_from_user(self):
        response = self.test_client.get_profile(self.test_client.user_id)
        self.__assert_get_profile(response, self.user_profile)

    def test_recreate_profile_existing_email(self):
        response = self.admin_client.create_profile(self.user_profile)
        assert response.status_code == 409

    def test_update_profile(self):
        profile_update = helpers.get_profile_update()
        response = self.test_client.update_profile(self.test_client.user_id, profile_update)
        assert response.status_code == 200
        self.test_client = init_client(self.URL, profile_update['email'], profile_update['password'])

    def test_list_profiles(self):
        response = self.admin_client.list_profiles()
        assert response.status_code == 200
        response = response.json()
        assert type(response) == list
        assert len(response) >= 2
        item = response[0]
        assert 'email' in item
        assert 'user_id' in item
        assert 'first_name' in item
        assert 'last_name' in item

    def test_list_profiles_from_user(self):
        response = self.test_client.list_profiles()
        assert response.status_code == 403

    @classmethod
    def tearDownClass(cls):
        if cls.test_client:
            response = cls.test_client.delete()
            assert response.status_code == 200
        if cls.admin_client:
            response = cls.admin_client.delete()
            assert response.status_code == 200

    @staticmethod
    def __assert_get_profile(response, expected):
        assert response.status_code == 200
        response = response.json()
        assert 'email' in response
        assert response['email'] == expected['email']
        assert 'user_id' in response
        assert 'zip_code' in response
        assert response['zip_code'] == expected['zip_code']
        # password should not be passed
        assert 'password' not in response


def init_client(url: str, email: str, password: str):
    client = TestClient(url, email, password)
    response = client.login()
    token, user_id = __test_login(response)
    client.set_user(token, user_id)
    return client


def __test_login(response):
    response = response.json()
    assert 'token' in response
    assert type(response['token']) == str

    token = response['token']
    token_dec = __decode(token)
    print(token_dec)
    assert 'user_id' in token_dec
    user_id = token_dec['user_id']
    return token, user_id


def __decode(token):
    return jwt.decode(token, verify=False)
