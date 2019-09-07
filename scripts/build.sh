#!/bin/bash

echo Removing existing images
docker rmi -f tythus-dkp-app_auth
docker rmi -f tythus-dkp-app_gateway
docker rmi -f tythus-dkp-app_guild
echo Building images
docker-compose build