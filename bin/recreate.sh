echo 'Restarting' $@
docker-compose stop $@
docker-compose build $@
docker-compose create $@
docker-compose start $@
