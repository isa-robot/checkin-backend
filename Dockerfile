FROM mongo:4.2.7 AS mongodb
ENV SCHEDULE_PASS="qualis"
ENV SCHEDULE_USER="qualis"
ENV MONGO_INITDB_ROOT_USERNAME="admin"
ENV MONGO_INITDB_ROOT_PASSWORD="admin"
COPY infra/mongodb/initdb /initdb
COPY infra/mongodb/initdb.sh /docker-entrypoint-initdb.d/
COPY infra/mongodb/custom-mongo.conf /etc/custom-mongo.conf
RUN rm -rf shared/infra/http/.env
EXPOSE 27017
CMD ["mongod","--auth", "-f", "/etc/custom-mongo.conf"]

FROM postgres:13-beta2 AS postgres
ENV DB_DATABASE="vigilancia"
ENV DB_USERNAME="qualis"
ENV DB_PASS="postgres"
ENV POSTGRES_PASSWORD="postgres"
ENV POSTGRES_USER="postgres"
ENV ESTABLISHMENT_NAME="isa-qualis"
ENV ESTABLISHMENT_EMAIL="@"
ENV ESTABLISHMENT_CNPJ="."
ENV ESTABLISHMENT_PHONE="."
ENV ESTABLISHMENT_CITY="."
COPY infra/postgresql/initdb /docker-entrypoint-initdb.d

FROM node:12.18 AS isa-api
ENV NOTIFICATION_APP_ID=""
ENV NOTIFICATION_REST_KEY=""
ENV NOTIFICATION_REST_URL = ""
ENV NOTIFICATION_ASSESSMENTS_TEMPLATE_ID=""
ENV SIGNATURE_URL=https://app.clicksign.com/api/v1/
ENV SIGNATURE_TOKEN=xxxx
ENV KEYCLOAK_SERVER_URL=http://keycloak:8080/auth
ENV KEYCLOAK_REALM=isa-qualis
ENV KEYCLOAK_CLIENT=isa-backend
ENV KEYCLOAK_ADMIN_USER=admin
ENV KEYCLOAK_ADMIN_PASSWORD=admin
ENV BASE_URL=http://localhost:3333/
ENV NODE_ENV=development
ENV PORT=3333
ENV FRONT_URL=http://localhost:3000
ENV APP_SECRET=SECRET
ENV APP_TOKEN=TOKEN
ENV EXPIRES_IN=1d
ENV DB_HOST=postgres
ENV DB_PORT=5432
ENV DB_USERNAME=postgres
ENV DB_PASS=postgres
ENV DB_DATABASE=vigilancia
ENV MONGO_HOST=mongodb://qualis:qualis@mongodb:27017/agenda
ENV MONGO_COLLECTION=agendaJobs
ENV LOG_HOST=mongodb://qualis:qualis@mongodb:27017/logs
ENV TZ=America/Sao_Paulo
ENV API_PORT 8080
ENV MEMORY 1024
COPY dist/. src/
WORKDIR /src
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

CMD node --max-old-space-size=$MEMORY --optimize-for-size --inspect shared/infra/http/server.js

FROM jboss/keycloak AS keycloak
ENV JAVA_OPTS="-Dkeycloak.profile.feature.upload_scripts=enabled"
ENV DB_VENDOR=postgres
ENV DB_ADDR=postgres
ENV DB_PASSWORD=postgres
ENV DB_USER=postgres
ENV KEYCLOAK_USER=admin
ENV KEYCLOAK_PASSWORD=admin
ENV KEYCLOAK_DEFAULT_THEME=qualis
COPY infra/keycloak/themes/qualis /opt/jboss/keycloak/themes/qualis
