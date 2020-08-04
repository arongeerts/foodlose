# Foodlose
Project for monitoring weight loss for customers of Foodlose

## How to use
### Deploy front-end
```
# Build (from front/website directory)
npm run-script build

# Run deployment
aws s3 sync build/ s3://foodlose-site-prod/ --acl public-read
```
### Deploy backend
```
# Build (from back directory)
sam build

# Run deployment
sam deploy --stack-name prod --parameter-overrides 'Env=dev TokenSecretParam=my-super-secret' --s3-bucket foodlose-deployment-bucket --capabilites CAPABILITY_NAMED_IAM
```