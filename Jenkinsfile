pipeline {
    agent {
        label "jenkins-slave"
    }

    environment {
        DOCKER_REGISTRY_CREDENTIALS = credentials('docker-hub-credentials')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build and Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', DOCKER_REGISTRY_CREDENTIALS) {
                        def webImage = docker.build("xdarkn/repo:workmission-web-latest", "./app")
                        def mongoImage = docker.build("xdarkn/repo:workmission-mongo-latest", "./mongodb")

                        webImage.push()
                        mongoImage.push()
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', DOCKER_REGISTRY_CREDENTIALS) {
                        def webImage = docker.image("xdarkn/repo:workmission-web-latest")
                        def mongoImage = docker.image("xdarkn/repo:workmission-mongo-latest")

                        sh 'docker-compose down'
                        sh 'docker-compose up -d'
                    }
                }
            }
        }
    }
}
