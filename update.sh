#!/bin/sh

repo=goro341/housee

sudo docker pull $repo:backend
sudo docker pull $repo:frontend
ENV="dev" BASE_URI="dev.housee.ai" docker-compose down
ENV="dev" BASE_URI="dev.housee.ai" docker-compose up -d

