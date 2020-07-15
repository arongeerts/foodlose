import json

from exceptions import PostNotExistsException
from handler.wrapper import must_authenticate, handler
from model.post import PostUpdate
from repositories.post import PostRepository


@handler
@must_authenticate
def main(event, context):
    try:
        post_update = PostUpdate(**json.loads(event["body"]))

        repo = PostRepository()

        repo.update(post_update)

        return {
            "statusCode": 200,
            "body": json.dumps({"status": "Updated"})
        }
    except PostNotExistsException:
        return {
            "statusCode": 404,
            "body": json.dumps({"detail": "Post not found"})
        }
