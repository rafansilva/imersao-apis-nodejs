## ----- POSTGRES
```
docker run \
    --name postgres \
    -e POSTGRES_USER=rafa \
    -e POSTGRES_PASSWORD=rafa \
    -e POSTGRES_DB=hero \
    -p 5432:5432 \
    -d \
    postgres

docker ps
docker exec -it postgres /bin/bash
```

## ----- MONGODB
docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=rafa \
    -e MONGO_INITDB_ROOT_PASSWORD=rafa \
    -d \
    mongo

docker exec -it mongodb \
    mongo --host localhost -u rafa  -p rafa --authenticationDatabase admin \
    --eval "db.getSiblingDB('heroes').createUser({user: 'rafael', pwd: 'rafael', roles: [{role: 'readWrite', db: 'heroes'}]})"