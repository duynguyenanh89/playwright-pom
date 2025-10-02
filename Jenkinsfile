pipeline {
    tools {
        nodejs 'NodeJS_24.1.0'
    }
    agent any

    // agent {
    //     docker {
    //         image 'mcr.microsoft.com/playwright:v1.44.0-jammy'
    //         args '--ipc=host'
    //     }
    // }

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
                echo "--------------------------------"
                echo "Running Playwright ..."
                sh 'npx playwright test' 
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