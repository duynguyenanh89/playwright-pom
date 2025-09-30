pipeline {
    agent any //{
        // docker {
        //     image 'mcr.microsoft.com/playwright:v1.55.0-noble'  // Use a specific version for reproducibility
        //     args '--shm-size=1g'  // Increase shared memory for browser stability
        // }
    //}
    environment {
        PATH = "/opt/homebrew/bin:$PATH"
    }
    stages {
        stage('Debug Environment') {
            steps {
                sh 'echo $PATH'
                sh 'which npm || true'
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