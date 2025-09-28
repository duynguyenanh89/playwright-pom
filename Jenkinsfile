pipeline {
    agent any
    tools {
        nodejs 'NodeJS_24.9.0' // Tên phiên bản Node.js được cấu hình trong Global Tool Configuration
        allure 'Allure_2.35.1' // Tên Allure được cấu hình trong Global Tool Configuration
    }
    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], 
                          userRemoteConfigs: [[url: 'https://github.com/duynguyenanh89/playwright-pom']],
                          extensions: [[$class: 'CloneOption', shallow: true, depth: 1]]])
            }
        }
        stage('Run Playwright Tests') {
            steps {
                sh 'bash scripts/run-tests.sh' // Call shell script
            }
        }
    }
    post {
        always {
        //     // Keep source code, remove unnecessary folder/files
        //     //sh 'rm -rf playwright-report test-results allure-results'
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
                // httpRequest contentType: 'APPLICATION_JSON', 
                //              httpMode: 'POST', 
                //              requestBody: message, 
                //              url: 'https://chat.googleapis.com/v1/spaces/AAQA-Iaj1-s/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=GL57ujfXoSYdvCa3qd9m39L-6rjWwxcxZUlRNIqQ7Ck'
            }
        }
        failure {
            script {
                def message = """
                {
                    "text": "Build FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}\nView Details: ${env.BUILD_URL}"
                }
                """
                // httpRequest contentType: 'APPLICATION_JSON', 
                //              httpMode: 'POST', 
                //              requestBody: message, 
                //              url: 'https://chat.googleapis.com/v1/spaces/AAQA-Iaj1-s/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=GL57ujfXoSYdvCa3qd9m39L-6rjWwxcxZUlRNIqQ7Ck'
            }
        }
    }
}