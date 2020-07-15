import boto3

from config import Config


class SecretsManager:
    instance = None

    class __SecretsManager:
        def __init__(self):
            config = Config()
            endpoint = config.get("SECRETS_MANAGER_ENDPOINT")
            admin_secret_key = config.get("SECRETS_ADMIN_SECRET_KEY")
            params = {'endpoint_url': endpoint}
            creds = {}
            if config.env == "local":
                creds = {"aws_access_key_id": "foo", "aws_secret_access_key": "bar"}
            client = boto3.client("secretsmanager", **params, **creds)
            self.admin_secret = client.get_secret_value(SecretId=admin_secret_key)["SecretString"]

        def get_admin_secret(self):
            return self.admin_secret

    def __init__(self):
        if not self.instance:
            self.instance = self.__SecretsManager()
        self.secret = self.instance.get_admin_secret()

    def get_admin_secret(self):
        return self.secret
