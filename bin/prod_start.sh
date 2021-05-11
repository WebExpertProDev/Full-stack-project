#!/bin/bash
#source pyEnv/bin/activate
export $(xargs < ./../../production.env)
python3 manage.py makemigrations
python3 manage.py migrate
gunicorn config.wsgi --bind 0.0.0.0 --workers 2
