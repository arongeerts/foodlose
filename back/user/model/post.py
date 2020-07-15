from typing import List, Optional

from pydantic import BaseModel


class PostBase(BaseModel):
    name: str
    text: str
    tags: Optional[List[str]] = []


class Post(PostBase):
    post_id: str
    img_url: Optional[str]
    timestamp: str


class PostInput(PostBase):
    img_data: Optional[str]

    def to_post(self, post_id, timestamp, img_url):
        d = self.dict()
        d["post_id"] = post_id
        d["timestamp"] = timestamp
        d["img_url"] = img_url
        return Post(**d)


class PostUpdate(PostBase):
    img_data: Optional[str]
    post_id: str
    timestamp: str
