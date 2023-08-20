pipeline {
    agent {
        label "Jenkins-slave-stronger"
    }

    environment {
        dockerImage = ''
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
                    docker.withRegistry('', registryCredential) {
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
                    docker.withRegistry('', registryCredential) {
                        def webImage = docker.image("xdarkn/repo:workmission-web-latest")
                        def mongoImage = docker.image("xdarkn/repo:workmission-mongo-latest")

                        sh 'docker-compose down'
                        sh 'docker-compose up -d'
                        sh 'sudo cp haproxy.cfg /etc/haproxy/haproxy.cfg'
                        sh 'sudo haproxy -f /etc/haproxy/haproxy.cfg &'
                        sh 'echo Haproxy!'

                        sleep(time: 3, unit: 'SECONDS') // Introduce a 5-second delay
                        
                        retry(3) {
                            def response = httpRequest(url: 'http://localhost:3000', httpMode: 'GET')
                            echo "Response code: ${response.status}"

                            if (response.status == 200) {
                                echo "Response body:\n${response.getContent()}"
                                echo "Response code: ${response.status}"
                            } else {
                                error "Failed to fetch web page"
                            }
                        }
                    }
                }
            }
        }
    }
post {
    success {
        script {
            def slackMessage = "Build successful: ${env.JOB_NAME} - ${env.BUILD_NUMBER}\n${env.BUILD_URL}"
            def slackUrl = 'https://hooks.slack.com/services/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'
            sh """
            curl -X POST -H 'Content-type: application/json' \
            --data '{"text":"${slackMessage}"}' \
            ${slackUrl}
            """
            sh './disable.sh'
            sh 'docker logout'
            archiveArtifacts artifacts: '**/target/*.jar', allowEmptyArchive: true
            }
        }
    }
}
