#!/bin/sh

if [ "$DATABASE_TYPE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $RDS_HOSTNAME $RDS_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

if [ "$ENV" != "production" ]
then
#    python manage.py flush --no-input
    python manage.py makemigrations
    python manage.py migrate
fi

exec "$@"
