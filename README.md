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
Run deployment by 
```
# Build image
docker build -t foodlose-deploy:latest .

# Run deployment
docker run -v ~/.aws:/root/aws foodlose-deploy:latest
```
