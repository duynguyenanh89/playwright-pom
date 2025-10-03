pipeline {
    tools {
        nodejs 'NodeJS_24.1.0'
    }

    //Add /usr/local/bin to PATH for docker command
    environment {
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
                echo  "-----------------------------------------------------------------"
                echo  "Start running Playwright ......."
                echo  "-----------------------------------------------------------------"
                sh 'docker run --rm --ipc=host mcr.microsoft.com/playwright:v1.55.1-noble /bin/bash'
                sh 'npx playwright test -g "@Smoke|@Regression"' 
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
                }

                success {
                    script {
                        def message = """
                        {
                            "text": "Build SUCCESSFUL: ${env.JOB_NAME} #${env.BUILD_NUMBER}\nView Details: ${env.BUILD_URL}"
                        }
                        """
                        httpRequest contentType: 'APPLICATION_JSON', 
                                    httpMode: 'POST', 
                                    requestBody: message, 
                                    url: 'https://chat.googleapis.com/v1/spaces/AAQA-Iaj1-s/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=GL57ujfXoSYdvCa3qd9m39L-6rjWwxcxZUlRNIqQ7Ck'
                    }
                }

                failure {
                    script {
                        def message = """
                        {
                            "text": "Build FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}\nView Details: ${env.BUILD_URL}"
                        }
                        """
                        httpRequest contentType: 'APPLICATION_JSON', 
                                    httpMode: 'POST', 
                                    requestBody: message, 
                                    url: 'https://chat.googleapis.com/v1/spaces/AAQA-Iaj1-s/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=GL57ujfXoSYdvCa3qd9m39L-6rjWwxcxZUlRNIqQ7Ck'
                    }
                }
            }
        }
    }
    
    post {
        always {
            script {
                // Ensure cleanWs runs in the Docker agent context
                node('') {  // Reuse the pipeline's Docker agent
                    cleanWs()
                }
            }
        }
        success {
            echo "All tests passed! 🎉"
        }
        failure {
            echo "Tests failed. Check artifacts for details. ❌"
        }
    }
}