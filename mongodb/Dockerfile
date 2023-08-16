FROM mongo:latest

RUN apt-get update && apt-get install -y mongodb-clients

COPY data.js /docker-entrypoint-initdb.d/
