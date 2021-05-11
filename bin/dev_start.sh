#!/bin/bash
export $(xargs < ./../../dev.env)
source pyEnv/bin/activate
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver
