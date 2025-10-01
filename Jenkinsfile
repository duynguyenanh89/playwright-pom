pipeline {
    tools {
        nodejs 'NodeJS_24.1.0'
        //dockerTool 'Docker_latest_version'  // Name from Tools config
    }
    agent any
    // agent {
    //     docker {
    //         // image 'mcr.microsoft.com/playwright:v1.55.0-noble'  // Use a specific version for reproducibility
    //         // args '--shm-size=1g'  // Increase shared memory for browser stability
    //         image 'node:18'  // Official Node.js image with npm pre-installed
    //         args '-u root'   // Run as root to avoid permission issues
    //     }
    // }
    stages {
        stage('Check npm/Node Setup') {
            steps {
                script {
                    // Echo environment details for debugging
                    sh 'echo "Current user: $(whoami)"'
                    sh 'echo "PATH: $PATH"'
                    sh 'echo "Node version:"'
                    sh 'node --version'
                    sh 'echo "npm version:"'
                    sh 'npm --version'
                    sh 'echo "npm location:"'
                    sh 'which npm || echo "npm not in PATH"'
                    // sh 'echo "Docker version:"'
                    // sh 'docker --version'
                }
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