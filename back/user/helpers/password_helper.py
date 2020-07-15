from typing import Union

import bcrypt


def encrypt(password: str) -> bytes:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())


def validate(password: str, hashed: Union[bytes, str]) -> bool:
    if type(hashed) == str:
        hashed = hashed.encode('utf-8')
    return bcrypt.checkpw(password.encode('utf-8'), hashed)
