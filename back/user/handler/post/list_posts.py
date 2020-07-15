import json

from handler.wrapper import handler
from repositories.post import PostRepository

DEFAULT_POSTS_PER_PAGE = 9

@handler
def main(event, context):
    query = event.get("queryStringParameters") or {}
    last_post_id = query.get("last_post_id")
    limit = query.get("limit", DEFAULT_POSTS_PER_PAGE)

    posts = PostRepository().list(last_post_id, limit)

    output = list(map(lambda p: p.dict(), posts))

    return {
        "statusCode": 200,
        "body": json.dumps(output),
    }
