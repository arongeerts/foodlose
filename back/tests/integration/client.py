import requests


class TestClient:
    def __init__(self, url: str, email: str, password: str):
        self.url = url
        self.email = email
        self.password = password
        self.token = None
        self.user_id = None

    def set_user(self, token: str, user_id: str):
        self.token = token
        self.user_id = user_id

    def login(self):
        response = requests.post(
            url=self.url + '/login',
            json={
                'email': self.email,
                'password': self.password
            }
        )
        print(f"Login response for {self.email}: {response}: {response.json()}")
        return response

    def create_profile(self, data: dict):
        response = requests.post(
            url=self.url + '/user',
            json=data,
            headers={
                'Authorization': self.token
            }
        )
        print(f"Create profile response for {self.email}: {response}: {response.json()}")
        return response

    def get_profile(self, user_id: str):
        response = requests.get(
            url=self.url + f'/user/{user_id}',
            headers={
                'Authorization': self.token
            }
        )
        print(f"Get profile response for {self.email}: {response}: {response.json()}")
        return response

    def update_profile(self, user_id: str, update: dict):
        response = requests.put(
            url=self.url + f'/user/{user_id}',
            json=update,
            headers={
                'Authorization': self.token
            }
        )
        print(f"Update profile response for {self.email}: {response}: {response.json()}")
        return response

    def list_profiles(self):
        response = requests.get(
            url=self.url + f'/user',
            headers={
                'Authorization': self.token
            }
        )
        print(f"List profiles response for {self.email}: {response}: {response.json()}")
        return response

    def delete(self):
        response = requests.delete(
            url=self.url + f'/user/{self.user_id}',
            headers={
                'Authorization': self.token
            }
        )
        print(f"Delete profile response for {self.email}: {response}: {response.json()}")
        return response
