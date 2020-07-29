import os
import jwt
import datetime

import requests

import argparse

parser = argparse.ArgumentParser()
parser.add_argument('--email', required=True)
parser.add_argument('--password', required=True)
args = parser.parse_args()

email = args.email
password = args.password

URL = os.environ['FOODLOSE_URL']
secret = os.environ['FOODLOSE_SECRET']

user = 'foodlose-admin'
token = jwt.encode({'user_id': user, 'exp': datetime.datetime.max, 'role': 'ADMIN'},
                   secret,
                   algorithm='HS256')

data = {
    "email": email,
    "password": password,
    "first_name": "ADMIN",
    "last_name": "USER",
    "gender": "X",
    "date_of_birth": "2000-01-01",
    "phone": "0032000000000",
    "zip_code": "0000",
    "consent_version": "1.0",
    "height": "200",
    "role": 'ADMIN'
}

response = requests.post(
    url=URL + '/user',
    json=data,
    headers={
        'Authorization': token
    }
)

print(response)
