#!/bin/bash

domain=$1

if [ -z "$domain" ]; then
  echo 'pass domain as first argument ./cert.sh [domain name]'
  exit 1
fi

openssl req -newkey rsa:2048 -new -nodes -keyout ssl/key.pem -out ssl/$domain.pem
