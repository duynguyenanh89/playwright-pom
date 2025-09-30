pipeline {
    agent any //{
        // docker {
        //     image 'mcr.microsoft.com/playwright:v1.55.0-noble'  // Use a specific version for reproducibility
        //     args '--shm-size=1g'  // Increase shared memory for browser stability
        // }
    //}
    
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
                    // Archive test results and reports for Jenkins UI
                    archiveArtifacts artifacts: 'playwright-report/**, test-results/**, *.png', allowEmptyArchive: true
                    // Publish HTML report if using Playwright's built-in reporter
                    publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'Playwright Report'
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