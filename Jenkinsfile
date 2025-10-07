pipeline {
    tools {
        nodejs 'NodeJS_24.1.0'
    }

    environment {
        //Add /usr/local/bin to PATH for docker command
        PATH = "/usr/local/bin:$PATH"     
    }

    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                echo "Installing npm dependencies..."
                sh 'npm ci'  // Use 'npm ci' for clean installs in CI
                sh 'npx playwright install --with-deps'  // Install Playwright browsers and system deps
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo "-----------------------------------------------------------------"
                echo "Starting Playwright tests..."
                echo "-----------------------------------------------------------------"
                sh 'docker run --rm -v $(pwd):/tests -w /tests my-playwright-tests npx playwright test -g "@Login|@Read-json"'
                // sh 'npx playwright test -g "@Login|@Read-json"' 
            }
        }
    }

    post {
        always {
            // Keep source code, remove unnecessary folder/files
            // sh 'rm -rf playwright-report test-results allure-results'
            allure([
                includeProperties: false,
                jdk: '',
                results: [[path: 'allure-results']],
                reportBuildPolicy: 'ALWAYS'  
            ])
            script {
                // Ensure cleanWs runs in the Docker agent context
                node('') {  // Reuse the pipeline's Docker agent
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
                                url: "${WEBHOOK_URL}",
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
                                url: "${WEBHOOK_URL}",
                                quiet: true
                }
            }
            echo 'Tests failed. Check artifacts for details. ❌'
        }
    }   
}