FROM mongo:latest

# Install the MongoDB client tools
RUN apt-get update && apt-get install -y wget gnupg && \
    wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | apt-key add - && \
    echo "deb http://repo.mongodb.org/apt/ubuntu $(lsb_release -sc)/mongodb-org/5.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-5.0.list && \
    apt-get update && \
    apt-get install -y mongodb-org-tools
    
COPY data.js /docker-entrypoint-initdb.d/
