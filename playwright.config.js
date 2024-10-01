// playwright.config.js
export default {
  testDir: './tests',  // Location of your test files
    use: {
      // Browser settings
      headless: true, // Always run in headful mode (visible browser)
      viewport: { width: 1920, height: 1080 }, // Full HD resolution
      ignoreHTTPSErrors: true,     // Ignore HTTPS errors (useful for staging environments)
      
      // Timeouts
      actionTimeout: 10000, // 10 seconds for each action like click, hover
      navigationTimeout: 30000, // 30 seconds for navigation (page load)
  
      // Automatically close the browser after the tests
      video: 'on-first-retry', // Record a video on test failure (optional)
    },
  
     // Assertions timeout
     expect: {
      timeout: 15000, // 10 seconds for expect assertions
    },
    // Global test settings
    timeout: 60000, // Maximum test timeout (1 minute)
  
    // Run tests in parallel with 2 workers
    workers: 3,
  
    // Configure projects (e.g., for running on different browsers)
    projects: [
      {
        name: 'Desktop Chrome',
        use: {
          browserName: 'chromium',
          channel: 'chrome', // Use Google Chrome
        },
      },
/*       {
        name: 'Desktop Firefox',
        use: {
          browserName: 'firefox',
        },
      },
      {
        name: 'Desktop WebKit',
        use: {
          browserName: 'webkit', // Safari-like browser
        },
      }, */
    ],

     // Add Allure reporter
  reporter: [
    ['list'],  // Keep the default console reporter
    ['allure-playwright']
  ],
  };
  