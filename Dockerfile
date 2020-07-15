# This Docker image will take care of the deployment to AWS 
FROM python:3.7

ENV FOODLOSE_ENV dev
ENV FOODLOSE_PASSWORD dummy_passw0rd

WORKDIR /app
COPY . /app
RUN apt update && apt install -y zip unzip 
RUN pip install awscli
RUN pip install -t back -r back/requirements.txt

ENTRYPOINT ./scripts/deploy.sh