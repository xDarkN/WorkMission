pipeline {
    agent {
        docker {
            image 'jenkins/agent:latest'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Deploy') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
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

