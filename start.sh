#!/bin/bash

# Create new cert: openssl req -newkey rsa:2048 -nodes  -keyout *.forestindex.com.key -out *.forestindex.com.csr
# copy the key and csr encrypted file to /ssl/
#

sudo $(aws ecr get-login --no-include-email --region us-east-1)

cd ~

sudo docker-compose pull

sudo docker-compose up -d >> ~/startup.stdout.log
