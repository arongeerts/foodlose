import datetime

from helpers.aws.dynamo import DynamoDB
from model.profile import ProfileUpdate, ProfileStorage, SearchProfile

from helpers.password_helper import encrypt
from config import Config
from exceptions import ProfileNotExistsException, MissingInputException


class ProfileRepository:
    config = Config()

    def __init__(self):
        self.profile_table_name = self.config.get("DYNAMODB_PROFILE_TABLE")
        self.dynamo = DynamoDB()

    def save(self, profile: ProfileStorage):
        dynamo_item = {
            "user_id": {"S": profile.user_id},
            "email": {"S": profile.email},
            "role": {"S": profile.role},
            "first_name": {"S": profile.first_name},
            "last_name": {"S": profile.last_name},
            "date_of_birth": {"S": profile.date_of_birth},
            "gender": {"S": profile.gender},
            "zip_code": {"S": profile.zip_code},
            "phone": {"S": profile.phone},
            "password_hash": {"S": profile.password_hash},
            "consent_version": {"S": profile.consent_version},
            "height": {"N": str(profile.height)},
            'meta_timestamp': {'S': datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
        }

        self.dynamo.put_item(table=self.profile_table_name, item=dynamo_item)

    def get_by_email(self, email: str):
        if not email:
            raise MissingInputException("email")

        key = {"email": {"S": email}}
        item = self.dynamo.get_item_by_index(table=self.profile_table_name, key=key, index="Email")

        if not item:
            raise ProfileNotExistsException()

        return ProfileStorage(
            user_id=item["user_id"]["S"],
            email=item["email"]["S"],
            role=item["role"]["S"],
            first_name=item["first_name"]["S"],
            last_name=item["last_name"]["S"],
            date_of_birth=item["date_of_birth"]["S"],
            gender=item["gender"]["S"],
            zip_code=item["zip_code"]["S"],
            phone=item["phone"]["S"],
            password_hash=item["password_hash"]["S"],
            consent_version=item["consent_version"]["S"],
            height=item["height"]["N"]
        )

    def get(self, user_id: str) -> ProfileStorage:
        if not user_id:
            raise MissingInputException("user_id")

        key = {"user_id": {"S": user_id}}
        item = self.dynamo.get_item(table=self.profile_table_name, key=key)

        if not item:
            raise ProfileNotExistsException()

        return ProfileStorage(
            user_id=item["user_id"]["S"],
            email=item["email"]["S"],
            role=item["role"]["S"],
            first_name=item["first_name"]["S"],
            last_name=item["last_name"]["S"],
            date_of_birth=item["date_of_birth"]["S"],
            gender=item["gender"]["S"],
            zip_code=item["zip_code"]["S"],
            phone=item["phone"]["S"],
            password_hash=item["password_hash"]["S"],
            consent_version=item["consent_version"]["S"],
            height=item["height"]["N"]
        )

    def delete(self, user_id: str):
        if not user_id:
            raise MissingInputException("user_id")
        key = {"user_id": {"S": user_id}}
        return self.dynamo.delete_item(table=self.profile_table_name, key=key)

    def update(self, current: ProfileStorage, new: ProfileUpdate):
        item = {}
        for field in current.__fields__.keys():
            item[field] = current.dict()[field]
            if new.dict().get(field):
                item[field] = new.dict().get(field)
        if new.password:
            item["password_hash"] = encrypt(new.password)
        new_profile = ProfileStorage(**item)
        self.save(new_profile)

    def list(self):
        response = self.dynamo.scan(table=self.profile_table_name,
                                    attributes=["user_id", "first_name", "last_name", "email", "role"])
        return list(map(lambda p: SearchProfile(user_id=p["user_id"]["S"],
                                                first_name=p["first_name"]["S"],
                                                last_name=p["last_name"]["S"],
                                                email=p["email"]["S"],
                                                role=p["role"]["S"]), response))

