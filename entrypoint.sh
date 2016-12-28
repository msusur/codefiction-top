#!/usr/bin/env sh

#Install client dependencies
echo "Installing client dependencies"
npm install
echo "Starting client ..."
npm start &

cd server
#Install server dependencies
echo "Installing server dependencies"
npm install
echo "Starting server ..."
npm start