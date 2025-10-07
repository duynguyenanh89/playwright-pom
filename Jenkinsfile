pipeline {
    options {
    buildDiscarder(logRotator(numToKeepStr: '10', artifactNumToKeepStr: '5'))
    //disableConcurrentBuilds()
    //timeout(time: 1, unit: 'HOURS')
    }

    tools {
        nodejs 'NodeJS_24.1.0'
    }

    environment {
        PATH = "/usr/local/bin:$PATH"
    }

    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                echo "Installing npm dependencies..."
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo "-----------------------------------------------------------------"
                echo "Starting Playwright tests..."
                echo "-----------------------------------------------------------------"
                sh 'npx playwright test -g "@Login|@Read-json"'
            }
        }
    }

    post {
        always {
            allure([
                includeProperties: false,
                jdk: '',
                results: [[path: 'allure-results']],
                reportBuildPolicy: 'ALWAYS'
            ])
            archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true
            sh 'rm -rf playwright-report test-results allure-results' // Uncommented to clean workspace
            script {
                node('') {
                    cleanWs()
                }
            }
        }
        success {
            withCredentials([string(credentialsId: 'google-chat-webhook', variable: 'WEBHOOK_URL')]) {
                script {
                    def message = """{"text": "Build SUCCESSFUL: ${env.JOB_NAME} #${env.BUILD_NUMBER}"}"""
                    httpRequest contentType: 'APPLICATION_JSON',
                                httpMode: 'POST',
                                requestBody: message,
                                url: WEBHOOK_URL,
                                quiet: true
                }
            }
            echo 'All tests passed! 🎉'
        }
        failure {
            withCredentials([string(credentialsId: 'google-chat-webhook', variable: 'WEBHOOK_URL')]) {
                script {
                    def message = """{"text": "Build FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}"}"""
                    httpRequest contentType: 'APPLICATION_JSON',
                                httpMode: 'POST',
                                requestBody: message,
                                url: WEBHOOK_URL,
                                quiet: true
                }
            }
            echo 'Tests failed. Check artifacts for details. ❌'
        }
    }
}