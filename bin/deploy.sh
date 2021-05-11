#!/bin/sh

tag=goro341/housee:backend
docker build -t $tag .
docker push $tag
