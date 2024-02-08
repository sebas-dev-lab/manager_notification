#/bin/#!/bin/bash

docker pull dockage/mailcatcher:0.9.0
docker run --name='mailcatcher' -d \
  --publish=1080:1080 \
  --publish=1025:1025 \
dockage/mailcatcher:0.9.0