#!/bin/bash

docker-compose -f docker-compose.yaml build --no-cache
docker-compose -f docker-compose.yaml up -d --force-recreate

echo "Provisioning completed!!!"
