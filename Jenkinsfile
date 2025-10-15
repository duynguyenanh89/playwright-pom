pipeline {
    agent any
    parameters {
        string(name: 'PLAYWRIGHT_TAGS', defaultValue: '@Login|@Read-json|@Example', description: 'Playwright tags to run')
        string(name: 'WORKERS', defaultValue: '4', description: 'Number of workers')
    }

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
        DEBUG = '' // Disable verbose Playwright logging
    }

    stages {
        stage('Clean Workspace') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'rm -rf playwright-report test-results allure-results'
                    } else {
                        bat 'if exist playwright-report rmdir /s /q playwright-report'
                        bat 'if exist test-results rmdir /s /q test-results'
                        bat 'if exist allure-results rmdir /s /q allure-results'
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo "Installing npm dependencies..."
                    if (isUnix()) {
                        sh 'npm ci'
                        sh 'npx playwright install --with-deps'
                    } else {
                        bat 'npm ci'
                        bat 'npx playwright install --with-deps'
                    }
                }
            }
        }

        stage('Setup Credentials') {
            steps {
                withCredentials([file(credentialsId: 'credentials-json-file', variable: 'CREDENTIALS_FILE')]) {
                    script {
                        try {
                            if (isUnix()) {
                                sh 'cp "$CREDENTIALS_FILE" data/credentials.json && echo "✅ Credentials copied successfully" || (echo "❌ Copy failed" && exit 1)'
                                // Set secure permissions
                                sh 'chmod 600 data/credentials.json'
                            } else {
                                bat 'copy "%CREDENTIALS_FILE%" data/credentials.json'
                            }
                            echo "✅ Credentials copied successfully"
                        } catch (Exception e) {
                            error "❌ Failed to copy credentials: ${e.getMessage()}"
                        }
                    }
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    echo "-----------------------------------------------------------------"
                    echo "Starting Playwright tests with tags: ${params.PLAYWRIGHT_TAGS}"
                    echo "-----------------------------------------------------------------"
                    if (isUnix()) {
                        sh "npx playwright test -g \"${params.PLAYWRIGHT_TAGS}\" --workers=${params.WORKERS}"
                    } else {
                        bat "npx playwright test -g \"${params.PLAYWRIGHT_TAGS}\" --workers=${params.WORKERS}"
                    }
                }
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