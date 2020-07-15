import json

from handler.wrapper import handler, must_be_admin
from model.post import PostInput
from repositories.post import PostRepository

@handler
@must_be_admin
def main(event, context):
    post_input = PostInput(**json.loads(event["body"]))

    PostRepository().save(post_input)

    return {
        "statusCode": 200,
        "body": json.dumps({"detail": "Post created"})
    }
