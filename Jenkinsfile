pipeline {
    agent {
        label "Jenkins-slave-stronger"
    }

    environment {
        DOCKER_REGISTRY = "https://docker.io" // Added "https" protocol
        DOCKERHUB_CREDENTIALS = 'docker-hub-credentials'
        WEB_IMAGE_NAME = "xdarkn/repo:workmission-web-latest"
        MONGO_IMAGE_NAME = "xdarkn/repo:workmission-mongo-latest"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Login') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
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
            sh 'docker logout'
            archiveArtifacts artifacts: '**/target/*.jar', allowEmptyArchive: true
        }
    }
}
