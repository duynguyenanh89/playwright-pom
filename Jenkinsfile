pipeline {
    tools {
        nodejs 'NodeJS_24.1.0'
    }

    //Add /usr/local/bin to PATH for docker command
    environment {
        // PATH = "/usr/local/bin:$PATH"
        PATH = "/Applications/Docker.app/Contents/Resources/bin:$PATH"
    }

    agent any

    // agent {
    //     docker {
    //         image 'mcr.microsoft.com/playwright:v1.55.1-noble'
    //         args '--ipc=host'
    //     }
    // }

    stages {
        stage('Check Docker') {
            steps {
                sh 'docker --version'
                sh 'docker info'
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
                script {
                        sh 'docker run -it --rm --ipc=host mcr.microsoft.com/playwright:v1.55.0-noble /bin/bash'
                        sh 'npx playwright test'
                    }
                }
            }
        }
    
        // stage('Run Playwright Tests') {
        //     agent {
        //         docker {
        //             image 'mcr.microsoft.com/playwright:v1.55.1-noble'
        //             args '--ipc=host'
        //         }
        //     }
        //     steps {
        //         echo  "-----------------------------------------------------------------"
        //         echo  "Start running Playwright ......."
        //         echo  "-----------------------------------------------------------------"
        //         sh 'npx playwright test' 
        //     }
        //     post {
        //         always {
        //             // Keep source code, remove unnecessary folder/files
        //             // sh 'rm -rf playwright-report test-results allure-results'
        //         allure([
        //             includeProperties: false,
        //             jdk: '',
        //             results: [[path: 'allure-results']],
        //             reportBuildPolicy: 'ALWAYS'  
        //         ])
        //         }
        //     }
        // }
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