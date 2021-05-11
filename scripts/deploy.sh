#!/bin/sh

tag=goro341/housee:frontend
docker build -t $tag .
docker push $tag
