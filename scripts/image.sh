#!/bin/bash

# update docker image

ACCOUNT=$(aws sts get-caller-identity --output text --query 'Account' --profile bluecactus)

$(aws ecr get-login --no-include-email --region us-east-1 --profile bluecactus)
docker build -t bluecactus/forest-index .
docker tag bluecactus/forest-index:latest 081027247578.dkr.ecr.us-east-1.amazonaws.com/bluecactus/forest-index:latest
docker push $ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/bluecactus/forest-index:latest
