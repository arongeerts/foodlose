import os


class Config:
    env = "dev"
    config = {
        "local": {
            "DYNAMODB_ENDPOINT": "http://localstack:4569",
            "DYNAMODB_RECORD_TABLE": "foodlose-records-local",
            "DYNAMODB_PROFILE_TABLE": "foodlose-profiles-local",
            "DYNAMODB_POSTS_TABLE": "foodlose-posts-dev",
            "POST_IMAGES_BUCKET": "foodlose-site-local",
            "SECRETS_ADMIN_SECRET_KEY": "foodlose-secret-local",
            "SECRETS_MANAGER_ENDPOINT": "http://localstack:4584",
            "ADMIN_EMAIL": "test@test.com"
        },
        "dev": {
            "DYNAMODB_ENDPOINT": "https://dynamodb.eu-west-1.amazonaws.com",
            "DYNAMODB_RECORD_TABLE": "foodlose-records-dev",
            "DYNAMODB_PROFILE_TABLE": "foodlose-profiles-dev",
            "DYNAMODB_POSTS_TABLE": "foodlose-posts-dev",
            "POST_IMAGES_BUCKET": "foodlose-site-dev",
            "SECRETS_ADMIN_SECRET_KEY": "foodlose-secret-dev",
            "SECRETS_MANAGER_ENDPOINT": "https://secretsmanager.eu-west-1.amazonaws.com",
            "ADMIN_EMAIL": "dummy@placeholder.com"
        },
        "prod": {
            "DYNAMODB_ENDPOINT": "https://dynamodb.eu-west-1.amazonaws.com",
            "DYNAMODB_RECORD_TABLE": "foodlose-records-prod",
            "DYNAMODB_PROFILE_TABLE": "foodlose-profiles-prod",
            "DYNAMODB_POSTS_TABLE": "foodlose-posts-prod",
            "POST_IMAGES_BUCKET": "foodlose-site-prod",
            "SECRETS_ADMIN_SECRET_KEY": "foodlose-secret-prod",
            "SECRETS_MANAGER_ENDPOINT": "https://secretsmanager.eu-west-1.amazonaws.com",
            "ADMIN_EMAIL": "dummy@placholder.com"
        }
    }

    def __init__(self):
        if os.environ.get("FOODLOSE_ENV"):
            print("Overwriting with env {}".format(os.environ.get("FOODLOSE_ENV")))
            self.env = os.environ.get("FOODLOSE_ENV")

    def get(self, key):
        if key in os.environ:
            return os.environ.get(key)
        return self.config.get(self.env, {}).get(key)
