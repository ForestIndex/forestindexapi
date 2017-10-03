#!/bin/bash

sudo certbot renew >> ~/renew.log
sudo cp /etc/letsencrypt/live/indexapi.forestindex.com/fullchain.pem ~/ssl/
sudo cp /etc/letsencrypt/live/indexapi.forestindex.com/pivkey.pem ~/ssl/
