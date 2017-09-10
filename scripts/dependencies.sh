#!/bin/bash

# ============ Host Dependencies ============ #

# docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
# sudo apt-cache policy docker-ce
sudo apt-get install -y docker-ce

# nginx
# install nginx on host in order to use the host certs from nginx container
sudo mkdir -p /etc/nginx/conf.d
sudo apt-get install nginx -Y

# aws cli
mkdir ~/.aws
sudo apt install python3
sudo apt install python-pip -Y
pip install --upgrade pip
sudo pip install awscli
echo 'export PATH=~/.local/bin:$PATH' >> .bashrc

# nodejs
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential

# tools
sudo apt-get install jq -y
