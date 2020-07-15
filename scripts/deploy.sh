# Setup
set +x -e

# Create the S3 Bucket for deployment
aws cloudformation deploy \
        --stack-name foodlose-bucket-$FOODLOSE_ENV \
        --template-file ./infra/deployment-bucket.yaml \
        --parameter-overrides Env=$FOODLOSE_ENV \
        --no-fail-on-empty-changeset
aws cloudformation wait stack-create-complete --stack-name foodlose-bucket-$FOODLOSE_ENV

# Zip the code for lambda and upload
cd back 
zip -r ../lambdaFunction.zip . -x '*.pyc' -x '*test/*' -x '*.idea/*' '*__pycache__*'
cd ..
aws s3 cp lambdaFunction.zip s3://foodlose-deployment-bucket-$FOODLOSE_ENV

# Setup the actual stack
aws cloudformation deploy \
        --stack-name foodlose-$FOODLOSE_ENV \
        --template-file ./infra/cf.yaml \
        --parameter-overrides Env=$FOODLOSE_ENV AdminPassword=$FOODLOSE_PASSWORD \
        --capabilities CAPABILITY_NAMED_IAM \
        --no-fail-on-empty-changeset
aws cloudformation wait stack-create-complete --stack-name foodlose-bucket-$FOODLOSE_ENV 