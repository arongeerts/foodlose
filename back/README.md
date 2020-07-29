# Foodlose

## Build and deploy
```bazaar
sam build
sam deploy --s3-bucket foodlose-deployment-bucket-dev --capabilities CAPABILITY_NAMED_IAM --no-confirm-changeset --parameter-overrides TokenSecretParam=<my-super-secret-password>
```

## Test
```bazaar
export PYTHONPATH=$PYTHONPATH:user
export FOODLOSE_URL=https://<api-url>/Prod
export FOODLOSE_SECRET=<MY-ADMIN-SECRET>
python -m unittest # integration and unit tests
python -m unittest tests.unit # unittests only (make sure to import classes in __init__.py file)

```
