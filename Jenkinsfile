pipeline {
    agent {
        label "Jenkins-slave-stronger"
    }

    environment {
        dockerImage =''
        registry = 'xdarkn/repo'
        registryCredential = 'docker-hub-credentials'
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
                    docker.withRegistry( '', registryCredential) {
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
                    docker.withRegistry( '', registryCredential) {
                        def webImage = docker.image("xdarkn/repo:workmission-web-latest")
                        def mongoImage = docker.image("xdarkn/repo:workmission-mongo-latest")

                        sh 'docker-compose down'
                        sh 'docker-compose up -d'
                        
                        def response = httpRequest(url: 'http://localhost:3000', httpMode: 'GET')
                        echo "Response code: ${response.status}"
                        
                        if (response.status == 200) {
                            echo "Response body:\n${response.getContent()}"
                        } else {
                            error "Failed to fetch web page"
                        }
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
