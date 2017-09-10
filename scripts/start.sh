#!/bin/bash
# ==========================================
# For Ubuntu Linux EC2
# ==========================================

# Place this file as ~/start.sh to be run on reboot

sudo $(aws ecr get-login --no-include-email --region us-east-1)

# clear containers
sudo docker rm $(sudo docker ps -a -q)
# API
sudo docker pull 081027247578.dkr.ecr.us-east-1.amazonaws.com/bluecactus/forest-index:latest
# Nginx
sudo docker pull 081027247578.dkr.ecr.us-east-1.amazonaws.com/nginx-bravo:latest

# get latest docker-compose
aws s3 cp s3://bluecactus-devops/forestindex/api_build/current/docker-compose.yml ~/

# start docker containers
cd ~
sudo docker-compose up