# Foodlose
Project for monitoring weight loss for customers of Foodlose

## Features
The following features are supported
* Admin can login using email and password
* Admin can create new posts without having to write code
* Posts are visible on web page
* Admin can create user profiles

## Architecture
* Frontend
    * ReactJS Web app
    * Hosting on static S3 website
    * Route 53
    * AWS Certificate Manager
    * AWS CloudFront
* Backend (managed by AWS SAM)
    * Database
        * AWS DynamoDB
    * API
        * AWS APIGateway
        * AWS Lambda
        * AWS SecretsManager
        * AWS SNS
        * AWS SES
        * AWS S3
        * AWS IAM

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