#!/bin/bash
#BUILD IMAGE CONTAINERS
echo "Building image backend api"
docker build -t api api/.
echo "Building image view-frontend"
docker build -t view_frontend view/.