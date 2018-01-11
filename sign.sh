#!/bin/bash

domain=$1

if [ -z "$domain" ]; then
  echo 'pass domain as first argument ./sign.sh [domain name]'
  exit 1
fi

openssl x509 -req -in ssl/$domain.pem -signkey ssl/key.pem -out ssl/$domain.crt
