# Web Application with NodeJS, MongoDB, and Containers

This repository contains scripts and code for provisioning a simple "hello world" web application with NodeJS, MongoDB, and containers. The architecture is defined using Infrastructure as Code (IaC) principles and includes scripts to set up and deploy the entire application stack.

## Features

- Web application with a "hello world" page and a touch of apples 🍎
- NodeJS for server-side scripting
- MongoDB for storing and managing data
- Docker containers for isolating components

## Architecture Overview

The architecture consists of the following components:

- NodeJS Web Server Container
- MongoDB Container
- HTML Page with Apple Count
- IaC Scripts for Provisioning and Deployment

## Getting Started

1. Clone this repository to your local machine.

```bash
git clone https://github.com/xDarkN/WorkMission.git
```
2. cd into the Directory
```bash 
cd WorkMission
```
3. Simply run the script to provision 
```bash
./provision.sh
```

## Usage
The web application can be accessed by navigating to http://localhost:8080.
The HTML page will display the number of apples stored in the MongoDB database.

## Jenkins CI/CD Pipeline With AWS Cloud
This repository also demonstrates the setup of a Continuous Integration and Continuous Deployment (CI/CD) pipeline using Jenkins as the CI/CD tool and AWS as the cloud provider. The pipeline automates the deployment of the web application architecture described above.

### Steps Taken
* Created 2 EC2 Instances: Jenkins master and Jenkins agent.

Jenkins master: T2.Micro instance running Linux OS with specific security group settings.
Jenkins agent: T2.XLarge instance with Docker and Docker Compose installed, sharing the same security group as the master.

* Installed Software:

Jenkins, Java, and SSH on the Jenkins master instance.
SSH, Java, Docker, and Docker Compose on the Jenkins agent instance.

* Jenkins Configuration:

Installed required plugins: Amazon EC2 Plugin, Docker, Docker Pipeline, SSH Build Agents Plugin, HTTP Request Plugin.
Created a new Jenkins agent node named "Jenkins-slave-stronger."

* Pipeline Setup:

Created a pipeline job in Jenkins, linked to a GitHub repository containing the application code.
Set SCM Schedule to run the Jenkinsfile every 5 minutes (H/5 * * * *).

* Also Created Load Balancer . and simply Modified Jenkins URL to the ALB DNS .

### Contact
If you have any questions or need assistance, please feel free to contact me at :  

* Mail : nadavedri1372@gmail.com 

* Linkedin : https://www.linkedin.com/in/nadav-edri-7b7ab8243/
## Screenshots

![App Screenshot](https://i.imgur.com/arL3OsG.png)

![App Screenshot](https://i.imgur.com/coIbgyC.png)
