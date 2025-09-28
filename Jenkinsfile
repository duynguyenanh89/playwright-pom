pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.40.0-jammy'
            args '--cap-add=SYS_ADMIN' // Required for xvfb in headless mode
        }
    }
    environment {
        CI = 'true' // Enable CI mode for Playwright
        HOME = "${WORKSPACE}" // Avoid permission issues with HOME
    }
    parameters {
        choice(name: 'TEST_SUITE', choices: ['all', 'smoke', 'regression'], description: 'Select test suite to run')
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install') {
            steps {
                sh 'npm ci' // Deterministic dependency installation
                sh 'npx playwright install --with-deps' // Install browsers and dependencies
            }
        }
        stage('Test') {
            steps {
                script {
                    def testCommand = "npx playwright test --workers=4" // Run with 4 parallel workers
                    if (params.TEST_SUITE != 'all') {
                        testCommand += " --grep @${params.TEST_SUITE}" // Filter by test suite tag
                    }
                    sh testCommand
                }
            }
        }
        stage('Generate Report') {
            steps {
                sh 'npx playwright show-report' // Generate HTML report
            }
        }
    }
    post {
        always {
            junit 'test-results/**/*.xml' // Publish JUnit results
            archiveArtifacts artifacts: 'test-results/**, playwright-report/**', allowEmptyArchive: true
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report'
            ])
            cleanWs() // Clean workspace to save space
        }
        success {
            echo 'Tests completed successfully!'
        }
        failure {
            echo 'Test failures detected. Check reports and artifacts.'
        }
    }
}