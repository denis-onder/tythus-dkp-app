#!/bin/bash

cd ./services/guild
if [ ! -d "dist" ]; then
  mkdir dist
fi
if [ -f ".env" ]; then
  cp ./.env ./dist
fi
npm start