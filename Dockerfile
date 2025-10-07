FROM mcr.microsoft.com/playwright:v1.56.0-noble

WORKDIR /tests
RUN npm install -g npm@11.6.1  # Update npm
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

#--- Command to build docker image 
## docker build -t my-playwright-tests .
## sh 'docker run --rm -v $(pwd):/tests -w /tests my-playwright-tests npx playwright test -g "@Login|@Read-json"'