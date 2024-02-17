#!/bin/bash

check_frontend_view=$(curl -X POST http://localhost:8000/user/login -H "Content-Type: application/json" -d '{"email":"tomek8855@gmail.com","password":"admin123"}')
check_api=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)

if [[ $check_frontend_view -ne 200 ]]; then
    echo "Frontend view is not available (HTTP code: $check_frontend_view)"
    exit 1
fi

if [[ $check_api -ne 200 ]]; then
    echo "API is not available (HTTP code: $check_api)"
    exit 1
fi

echo "Both frontend view and API are available."
# Add your further script logic here