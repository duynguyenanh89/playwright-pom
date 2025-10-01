pipeline {
    tools {
        nodejs 'NodeJS_24.1.0'
    }
    agent none

    // agent {
    //     docker {
    //         // image 'mcr.microsoft.com/playwright:v1.55.0-noble'  // Use a specific version for reproducibility
    //         // args '--shm-size=1g'  // Increase shared memory for browser stability
    //         image 'node:24'  // Official Node.js image with npm pre-installed
    //         args '-u root'   // Run as root to avoid permission issues
    //     }
    // }

    stages {
        stage('Check Host Docker') {
            environment {
                PATH = "/usr/local/bin:$PATH"  // Adjust if docker is elsewhere
            }
            steps {
                script {
                    // Verify Docker CLI and daemon on host
                    sh 'echo "Host PATH: $PATH"'
                    sh 'which docker || echo "Docker not found"'
                    sh 'docker --version || echo "Docker CLI failed"'
                    sh 'docker info --format "{{.ServerVersion}}" || echo "Docker daemon not accessible"'
                }
            }
        }

        stage('Check npm/Node in Docker') {
            agent {
                docker {
                    image 'node:18'  // Node.js 18 with npm
                    args '-u root'   // Avoid permission issues
                }
            }
            steps {
                script {
                    // Verify npm/Node in container
                    sh 'echo "Container user: $(whoami)"'
                    sh 'echo "Container PATH: $PATH"'
                    sh 'node --version'
                    sh 'npm --version'
                    sh 'which npm || echo "npm not in PATH"'
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
                sh 'npx playwright test' 
            }
            post {
                always {
                    // Keep source code, remove unnecessary folder/files
                    sh 'rm -rf playwright-report test-results allure-results'
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