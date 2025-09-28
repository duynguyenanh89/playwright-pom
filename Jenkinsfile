/**
 * Declarative Pipeline for running Playwright E2E tests inside a standardized Docker container.
 *
 * Best practices implemented:
 * 1. Docker Agent: Uses the official Playwright Docker image for environmental consistency.
 * 2. npm ci: Ensures reliable dependency installation based on package-lock.json.
 * 3. Browser Install: Installs necessary system dependencies for the browsers using --with-deps.
 * 4. Reporting: Generates and publishes JUnit XML results and archives the HTML report.
 */
pipeline {
    // 1. Define the execution environment using a Playwright Docker image
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:latest'
            // Use shm-size parameter to allocate more shared memory, which is crucial
            // for chromium to run properly in a containerized environment.
            args '-v /dev/shm:/dev/shm'
        }
    }

    // Set up default environment variables
    environment {
        // Set your application's base URL here, which Playwright can read in its config
        BASE_URL = 'http://your-staging-environment.com'
        // Set CI flag to true, which Playwright can use to enable features like retries
        CI = 'true'
    }

    options {
        // Automatically check out the code from GitHub before the pipeline starts
        // This is necessary since the Jenkinsfile lives in the GitHub repo
        skipDefaultCheckout(false)
        // Set a reasonable timeout for the entire pipeline
        timeout(time: 30, unit: 'MINUTES')
    }

    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    echo "Checking out code and installing dependencies..."
                    // 2. Use 'npm ci' for clean, faster, and reliable installs based on package-lock.json
                    sh 'npm ci'

                    // 3. Install browser binaries and necessary OS dependencies
                    // '--with-deps' is crucial when running on a fresh Linux agent/container
                    sh 'npx playwright install --with-deps'
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    echo "Starting Playwright E2E tests..."
                    // Execute tests. We expect Playwright to be configured to output
                    // a JUnit XML report (e.g., to 'test-results/junit.xml')
                    // and use parallel workers (e.g., workers: 4 in playwright.config.ts)
                    sh 'npx playwright test'
                }
            }
        }
    }

    // Post-build actions for cleanup and reporting
    post {
        always {
            // 4. Archive artifacts (screenshots, traces, HTML report) for debugging
            // Note: Playwright reports are generated in the playwright-report/ directory by default.
            echo 'Archiving Playwright artifacts...'
            archiveArtifacts artifacts: 'playwright-report/**, test-results/**, **/*.json, **/*.zip', onlyIfSuccessful: false

            // 5. Publish JUnit test results for visual summary in Jenkins UI
            // Ensure your playwright.config.ts is set up to output JUnit:
            // reporter: [['list'], ['junit', { outputFile: 'test-results/junit.xml' }]],
            echo 'Publishing JUnit test results...'
            junit 'test-results/junit.xml'
        }
        failure {
            echo 'Tests failed. Check archived artifacts and console output for traces/screenshots.'
        }
    }
}
