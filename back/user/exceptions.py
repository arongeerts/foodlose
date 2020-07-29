class AuthorizationException(Exception):
    pass


class ProfileAlreadyExistsException(Exception):
    pass


class MissingInputException(Exception):
    pass


class ProfileNotExistsException(Exception):
    pass


class RecordNotExistsException(Exception):
    pass


class TokenExpiredException(Exception):
    pass


class PostNotExistsException(Exception):
    pass
