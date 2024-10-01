# Use the official Node.js image as a base image
FROM mcr.microsoft.com/playwright:v1.32.3-focal

# Install Google Chrome
RUN apt-get update && \
    apt-get install -y wget gnupg --no-install-recommends && \
    wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' && \
    apt-get update && \
    apt-get install -y google-chrome-stable --no-install-recommends && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set the environment variables to enable Playwright browsers in the container
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright/

# Copy the project files to the container
WORKDIR /app
COPY . .

# Install dependencies
RUN npm install

# Run tests by default when the container starts
CMD ["npx", "playwright", "test"]