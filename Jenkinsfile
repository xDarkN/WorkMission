pipeline {
    agent {
        label "Jenkins-slave-stronger"
    }

    environment {
        DOCKER_REGISTRY = "docker.io" // Change this if using a different registry
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'
        WEB_IMAGE_NAME = "xdarkn/repo:workmission-web-latest"
        MONGO_IMAGE_NAME = "xdarkn/repo:workmission-mongo-latest"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Authenticate with Docker Hub') {
            steps {
                script {
                    docker.withRegistry("${DOCKER_REGISTRY}", "${DOCKER_CREDENTIALS_ID}") {
                        // You are now authenticated with Docker Hub for this stage
                    }
                }
            }
        }

        stage('Build and Push Docker Images') {
            steps {
                script {
                    try {
                        def webImage = docker.build("${WEB_IMAGE_NAME}", "./app")
                        def mongoImage = docker.build("${MONGO_IMAGE_NAME}", "./mongodb")

                        webImage.push()
                        mongoImage.push()
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        error("Error building or pushing Docker images: ${e.message}")
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    try {
                        def webImage = docker.image("${WEB_IMAGE_NAME}")
                        def mongoImage = docker.image("${MONGO_IMAGE_NAME}")

                        sh 'docker-compose down'
                        sh 'docker-compose up -d'
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        error("Error deploying Docker images: ${e.message}")
                    }
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '**/target/*.jar', allowEmptyArchive: true
        }
    }
}
