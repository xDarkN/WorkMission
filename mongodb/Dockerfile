FROM mongo:latest

# Install the MongoDB client tools
RUN apt-get update && apt-get install -y wget gnupg

# Import MongoDB public GPG key
RUN wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | apt-key add -

# Add MongoDB repository to sources.list
RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/5.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-5.0.list

# Install MongoDB client tools
RUN apt-get update && apt-get install -y mongodb-org-tools
    
COPY data.js /docker-entrypoint-initdb.d/
