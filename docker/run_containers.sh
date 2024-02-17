#!/bin/bash
#BUILD IMAGE CONTAINERS
# echo "Building image backend api"
# docker build -t api ../api/.
# echo "Building image view-frontend"
# docker build -t view_frontend ../view/.
# echo "Building image postgres"
# docker build -t postgres_db ../postgres/.

if [ $# -eq 0 ]; then
    echo "No argument supplied
    'up' - run containers
    'down' - stop and remove containers"
elif [ $1 == "up" ]; then
    echo "Containers Run"
    docker-compose  \
    -f app.yml  $1 -d
elif [ $1 == "down" ]; then
    echo "Containers Down"
    docker-compose  \
    -f app.yml $1
fi