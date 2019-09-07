#!/bin/bash
cd ./services/auth && npm install
cd ../gateway && npm install
cd ../guild && npm install
clear
echo "Done!"