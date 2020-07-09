# Network
Caso a rede isa-net não exista ela deve ser criada.
```
docker network create isa-net
```

# Using available container

## mongodb
```
docker run --network isa-net -d -p 27017:27017 --name mongodb drferreira/isa-mongodb
```
## POSTGRESQL
```
docker run --network isa-net -d -p 5432:5432 --name postgres drferreira/isa-postgres
```
## API
```
UNDER CONSTRUCTION
```
## KEYCLOAK
```
docker run --network isa-net -d -p 8080:8080 -e DB_VENDOR=postgres -e DB_ADDR="postgres" -e DB_PASSWORD="postgres" -e DB_USER="postgres" -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin --name keycloak jboss/keycloak
```
## FRONTEND
```
UNDER CONSTRUCTION
```

# Building and running containers
Caso o desejado seja construir as respectivas imagens e não utilizar as disponiveis, siga estes passos.

## mongodb
```
docker build --target mongodb -t mongodb .
docker run --network isa-net -d -p 27017:27017 --name mongodb mongodb
```
## POSTGRESQL
```
docker build --target postgres -t postgres .
docker run --network isa-net -d -p 5432:5432 --name postgres postgres
```
## API
UNDER CONSTRUCTION
```
docker build --target api -t api .
docker run --network isa-net -d -p 8080:8080 --name api isa-api
```
## KEYCLOAK
```
docker run --network isa-net -d -p 8080:8080 -e DB_VENDOR=postgres -e DB_ADDR="postgres" -e DB_PASSWORD="postgres" -e DB_USER="postgres" -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin --name keycloak jboss/keycloak
```
## FRONTEND
```
UNDER CONSTRUCTION
```
