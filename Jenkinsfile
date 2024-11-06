pipeline {
    agent any
    tools {
        nodejs 'node_20_18_0' // Usa el nombre que configuraste en Jenkins
    }

    stages {
        stage('Checkout Frontend') {
            steps {
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/fcr1s/bank_app_frontend']])
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build Frontend') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Build Docker Image for Frontend') {
            steps {
                bat 'docker build -t fcr1s/bank_app_frontend:latest .'
            }
        }

        stage('Push Frontend Docker Image to Docker Hub') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'docker_hub_token', variable: 'DOCKER_TOKEN')]) {
                        bat 'docker login -u fcr1s -p %DOCKER_TOKEN%'
                    }
                    bat 'docker push fcr1s/bank_app_frontend:latest'
                }
            }
        }
    }
}
