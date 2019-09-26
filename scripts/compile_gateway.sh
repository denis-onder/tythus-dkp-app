#!/bin/bash

cd ./services/gateway
if [ ! -d "dist" ]; then
  mkdir dist
fi
if [ -f ".env" ]; then
  cp ./.env ./dist
fi
tsc