import json

from exceptions import PostNotExistsException
from handler.wrapper import handler, must_be_admin
from repositories.post import PostRepository


@handler
@must_be_admin
def main(event, context):
    try:
        post_id = event.get("pathParameters", {}).get("post_id")

        # Will throw an exception if the profile does not exist
        PostRepository().get(post_id)

        PostRepository().delete(post_id)

        return {
            "statusCode": 200,
            "body": json.dumps({"status": "Deleted"})
        }
    except PostNotExistsException:
        return {
            'statusCode': 404,
            "body": json.dumps({"detail": "Post does not exist"})
        }

