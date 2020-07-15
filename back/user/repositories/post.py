import base64
import datetime

from config import Config
from exceptions import PostNotExistsException
from helpers.aws.dynamo import DynamoDB
from helpers.aws.s3 import S3
from model.post import PostInput, Post, PostUpdate

DATEFORMAT = "%Y-%m-%dT%H:%M:%S"
# this way we can query the sort index in DynamoDB
POST_DUMMY_PARTITION = "posts"


class PostRepository:

    def __init__(self):
        self.config = Config()
        self.s3 = S3()
        self.dynamo = DynamoDB()
        self.posts_table_name = self.config.get("DYNAMODB_POSTS_TABLE")

    def save(self, post_in: PostInput):
        timestamp: str = datetime.datetime.now().strftime(DATEFORMAT)
        post_id: str = timestamp.replace("-", "").replace("T", "").replace(":", "")
        img_url = self.__store_image(post_in.img_data, post_id)
        post = post_in.to_post(post_id=post_id, timestamp=timestamp, img_url=img_url)
        self.__save_post(post)

    def get(self, post_id):
        post = self.dynamo.get_item(table=self.posts_table_name,
                                    key={"post_id": {"S": post_id},
                                         "post_partition": {"S": POST_DUMMY_PARTITION}}
                                    )
        if not post:
            raise PostNotExistsException()
        return self.__from_dynamo(post)

    def delete(self, post_id: str):
        key = {"post_id": {"S": post_id}, "post_partition": {"S": POST_DUMMY_PARTITION}}
        post = self.dynamo.get_item(table=self.posts_table_name, key=key)
        if not post:
            raise PostNotExistsException()
        else:
            self.dynamo.delete_item(self.posts_table_name, key)

    def list(self, last_post_id: str, limit: int):
        offset = None
        if last_post_id:
            offset = {
                "post_partition": {"S": POST_DUMMY_PARTITION},
                "post_id": {"S": last_post_id}
            }

        response = self.dynamo.query_by_key(self.posts_table_name,
                                            "post_partition",
                                            POST_DUMMY_PARTITION,
                                            sort_asc=False,
                                            limit=limit,
                                            offset=offset)

        return list(map(lambda p: self.__from_dynamo(p), response))

    def __store_image(self, img_data: str, post_id: str):
        key = "site-images/{}".format(post_id)
        bucket = self.config.get('POST_IMAGES_BUCKET')
        img_url = f"https://{bucket}.s3-eu-west-1.amazonaws.com/{key}"

        img_data = img_data[img_data.find(",") + 1:]
        img = base64.b64decode(img_data + "===")
        self.s3.save(bucket, key, img, 'public-read')
        return img_url

    def update(self, update: PostUpdate):
        post = self.get(update.post_id)
        if update.img_data:
            img_url = self.__store_image(update.img_data, update.post_id)
            post.img_url = img_url
        post.name = update.name
        post.text = update.text
        post.tags = update.tags
        self.__save_post(post)

    def __save_post(self, post):
        dynamo_item = {
            "post_partition": {"S": POST_DUMMY_PARTITION},
            "post_id": {"S": post.post_id},
            "timestamp": {"S": post.timestamp},
            "img_url": {"S": post.img_url},
            "name": {"S": post.name},
            "text": {"S": post.text},
            "tags": {"SS": post.tags}
        }
        self.dynamo.put_item(table=self.posts_table_name, item=dynamo_item)

    @staticmethod
    def __from_dynamo(item: dict) -> Post:
        return Post(
            name=item["name"]["S"],
            text=item["text"]["S"],
            post_id=item["post_id"]["S"],
            timestamp=item["timestamp"]["S"],
            img_url=item["img_url"]["S"],
            tags=item["tags"]["SS"]
        )
