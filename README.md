# Foodlose
Project for monitoring weight loss for customers of Foodlose

## How to use
Run deployment by 
```
# Build image
docker build -t foodlose-deploy:latest .

# Run deployment
docker run -v ~/.aws:/root/aws foodlose-deploy:latest
```
