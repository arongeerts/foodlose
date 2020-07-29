import json

from exceptions import PostNotExistsException
from handler.wrapper import handler
from repositories.post import PostRepository


@handler
def main(event, context):
    try:
        post_id = event.get("pathParameters", {}).get("post_id")

        post = PostRepository().get(post_id)

        return {
            "statusCode": 200,
            "body": post.json()
        }
    except PostNotExistsException:
        return {
            "statusCode": 404,
            "body": json.dumps({"detail": "Post not found"})
        }
