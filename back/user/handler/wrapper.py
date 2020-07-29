import json
import functools
import traceback
from pydantic.error_wrappers import ValidationError

from auth.controller import Authenticator
from exceptions import AuthorizationException, TokenExpiredException, MissingInputException


def handler(func):
    @functools.wraps(func)
    def wrapper(event, context):
        response = None
        try:
            print("Event")
            print("-----")
            print(event)
            print("-----")
            print("context")
            print("-----")
            print(context)
            print("-----")
            response = func(event, context)

        except AuthorizationException:
            traceback.print_exc()
            response = {
                "statusCode": 403,
                "body": json.dumps({"detail": "Unauthorized to perform this action"})
            }
        except TokenExpiredException:
            traceback.print_exc()
            response = {
                "statusCode": 401,
                "body": json.dumps({"detail": "Token Expired"})
            }
        except ValidationError as e:
            traceback.print_exc()
            response = {
                "statusCode": 422,
                "body": json.dumps({"detail": str(e)})
            }
        except MissingInputException as e:
            traceback.print_exc()
            response = {
                "statusCode": 422,
                "body": json.dumps({"detail": "Missing attribute {}".format(e.args[0])})
            }
        except Exception:
            traceback.print_exc()
            response = {
                "statusCode": 500,
                "body": json.dumps({"detail": "An unknown exception occurred"})
            }
        if type(response) != dict:
            print('Invalid response, not a dict, but {}: {}'.format(type(response), response))
            response = {
                "statusCode": 500,
                "body": json.dumps({"detail": "An unknown exception occurred"})
            }

        if not response.get('headers'):
            response['headers'] = {}
            response['headers']['Access-Control-Allow-Origin'] = '*'
            response['headers']['Access-Control-Allow-Headers'] = '*'
            response['headers']['Access-Control-Allow-Methods'] = '*'
            response['headers']['Access-Control-Allow-Credentials'] = True
            print(f'Response: {response}')
            return response

    return wrapper


def must_authenticate(func):
    def wrapper(event, context):
        auth = Authenticator()
        token: str = event.get("headers", {}).get("Authorization")
        try:
            auth.authenticate_admin(token)
        except AuthorizationException:
            subject_email: str = event["pathParameters"].get("user_id")
            if not subject_email:
                raise MissingInputException("user_id")

            # Will raise an exception if user is not authorized
            auth.authenticate(token, subject_email)

        return func(event, context)

    return wrapper


def must_be_admin(func):
    @functools.wraps(func)
    def wrapper(event, context):
        auth = Authenticator()
        token: str = event.get("headers", {}).get("Authorization")
        # Will raise an exception if not admin
        auth.authenticate_admin(token)
        return func(event, context)

    return wrapper
