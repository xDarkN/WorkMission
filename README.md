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

1. **Created 2 EC2 Instances: Jenkins master and Jenkins agent.**

   - Jenkins master: Launched a T2.Micro instance running Linux OS.
     - Applied the following inbound rules to the security group:
       - Type: Custom TCP, Port: 3000
       - Type: Custom TCP, Port: 8080
       - Type: Custom TCP, Port: 27017
       - Type: SSH, Port: 22

   - Jenkins agent: Launched a T2.XLarge instance with Docker and Docker Compose installed.
     - Attached the same security group as the Jenkins master.

2. **Installed Software:**

   - Installed Jenkins, Java, and SSH on the Jenkins master instance.
   - Installed SSH, Java, Docker, and Docker Compose on the Jenkins agent instance.

3. **Jenkins Configuration:**

   - Installed required plugins: Amazon EC2 Plugin, Docker, Docker Pipeline, SSH Build Agents Plugin, HTTP Request Plugin.
   - Created a new Jenkins agent node named "Jenkins-slave-stronger."
   - Configured the agent with the appropriate labels.
   - Used SSH launch method and provided the agent instance's IP and SSH credentials.
   - Ensured Java and Docker were installed on the agent.

4. **Pipeline Setup:**

   - Created a pipeline job in Jenkins, linked to a GitHub repository containing the application code.
   - Set SCM Schedule to run the Jenkinsfile every 5 minutes (H/5 * * * *).

5. **Load Balancer Configuration:**

   - Created an Application Load Balancer (ALB) on AWS.
   - Added listeners to the ALB for the required ports (e.g., 8080).
   - Linked the ALB to the Jenkins master EC2 instance.
   - Modified the Jenkins URL to use the ALB DNS.

### Contact
If you have any questions or need assistance, please feel free to contact me at :  

* Mail : nadavedri1372@gmail.com 

* Linkedin : https://www.linkedin.com/in/nadav-edri-7b7ab8243/
## Screenshots

![App Screenshot](https://i.imgur.com/arL3OsG.png)

![App Screenshot](https://i.imgur.com/coIbgyC.png)

![App Screenshot](https://imgur.com/9CjXy37)
