pipeline {
    environment {
        PATH = "/opt/homebrew/bin/npm:$PATH" //npm path
        // PATH = "/usr/local/bin/docker" // docker path
        //PATH = "/opt/homebrew/bin/npm:/usr/local/bin/docker:$PATH" //combined 2 pathes
    }
    agent any
    // agent {
    //     docker {
    //         image 'mcr.microsoft.com/playwright:v1.55.0-noble'  // Use a specific version for reproducibility
    //         args '--shm-size=1g'  // Increase shared memory for browser stability
    //     }
    // }
    stages {
        stage('Debug Environment') {
            steps {
                // Verify npm and docker are accessible
                echo "--------------------------------"
                echo "NPM path and version:"
                sh 'which npm'
                sh 'npm --version'
                echo "--------------------------------"

                echo "--------------------------------"
                echo "Docker path and version:"
                sh 'which docker'
                sh 'docker --version'
                echo "--------------------------------"
            }
        }
        stage('Install Dependencies') {
            steps {
                echo "Installing npm dependencies..."
                sh 'npm ci'  // Use 'npm ci' for clean installs in CI
                sh 'npx playwright install --with-deps'  // Install Playwright browsers and system deps
            }
        }
    
        stage('Run Playwright Tests') {
            steps {
                echo "Running Playwright tests..."
                sh 'npx playwright test --project=chromium'  // Run on Chromium
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