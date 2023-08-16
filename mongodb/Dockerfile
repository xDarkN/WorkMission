# Use the official MongoDB image as the base
FROM mongo:latest

# Install prerequisites
RUN apt-get update && apt-get install -y wget

# Download and install MongoDB tools package
RUN wget https://repo.mongodb.org/apt/ubuntu/dists/jammy/mongodb-org/5.0/multiverse/binary-amd64/mongodb-org-tools_5.0.4_amd64.deb && \
    dpkg -i mongodb-org-tools_5.0.4_amd64.deb && \
    rm mongodb-org-tools_5.0.4_amd64.deb
    
COPY data.js /docker-entrypoint-initdb.d/
