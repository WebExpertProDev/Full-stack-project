# Housee Up
How to launch the entire platform?

To run the entire platform using docker locally,
``$ docker-compose -f docker-compose.local.yml up``
 
to recreate a container locally:
``$ /bin/sh /bin/recreate.sh <CONTAINER_NAME>``

to initdb locally:
``$ docker-compose exec backend python3 manage.py initdb``

to initdb in server:

``$ docker exec -it <CONTAINER_ID> /bin/sh``
``$ python3 manage.py initdb``

to collect static files into s3 repo:

``$ python3 manage.py collectstatic``

### Deployment
How to deploy code changes?
``$ /bin/sh services/<SERVICE_REPO>/deploy.sh``
 
In the deployed production environment, execute: (Make sure production.env file exists)

``$ docker-compose up``

In a deployed non-prod(ondemand) environment, execute: (Make sure ondemand.env file exists)

``$ ENV="ondemand" BASE_URI="ondemand.housee.ai" docker-compose up -d``

### On demand Environment
You would have to 
- create <ONDEMAND_ENV>.env file
- launch an instance and get the public ip (make sure there is tcp/80 0.0.0.0/0 inbound rule)
- set two "A" DNS records. one for <ONDEMAND_ENV> and one for www.<ONDEMAND_ENV> and set their values to the ip
- On the newly created instance, install docker and execute ``$ ENV="ONDEMAND_ENV" BASE_URI="ONDEMAND_ENV.housee.ai" docker-compose up``
