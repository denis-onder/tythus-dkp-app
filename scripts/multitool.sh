#!/bin/bash
printf 'Command: '
read COMMAND
cd ./services/auth && $COMMAND
cd ../gateway && $COMMAND
cd ../guild && $COMMAND
clear
echo "Done!"