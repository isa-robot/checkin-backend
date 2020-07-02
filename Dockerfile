FROM node:10.16.1 AS api
COPY src/. src/
WORKDIR /src
ENV MEMORY 1024
ENV DATABASE_HOSTNAME mongodb
ENV DATABASE_PORT 27017
ENV DATABASE_USER qualis
ENV DATABASE_PASS qualis
ENV DATABASE isa
ENV API_PORT 8080
CMD node --max-old-space-size=$MEMORY --optimize-for-size app.js

FROM mongo:4.0.4 AS mongodb
ENV DATABASE_USER="otus"
ENV DATABASE_PASS="otus"
ENV MONGO_INITDB_ROOT_USERNAME="admin"
ENV MONGO_INITDB_ROOT_PASSWORD="admin"
ENV MONGO_INITDB_DATABASE="admin"
COPY infra/mongodb/initdb /initdb
COPY infra/mongodb/initdb.sh /docker-entrypoint-initdb.d/
COPY infra/mongodb/custom-mongo.conf /etc/custom-mongo.conf
EXPOSE 27017
CMD ["mongod","--auth", "-f", "/etc/custom-mongo.conf"]

FROM postgres:alpine AS postgres
ENV POSTGRES_PASSWORD="postgres"
ENV POSTGRES_USER="postgres"

FROM jboss/keycloak:10.0.2 AS keycloak
ENV DB_VENDOR="postgres"
ENV DB_ADDR="postgres"
ENV DB_PORT="5432"
ENV DB_USER="keycloak"
ENV DB_PASSWORD="keycloak"
ENV KEYCLOAK_USER="admin"
ENV KEYCLOAK_PASSWORD="admin"
