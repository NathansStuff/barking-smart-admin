const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    ignoreDefaultArgs: ['--enable-automation'],
  });

  try {
    const page = await browser.newPage();

    // Navigate to the admin dashboard
    await page.goto('https://admin.barkingsmart.com/', {
      waitUntil: 'networkidle0',
    });

    // Wait for and click the Google login button
    // Using multiple possible selectors since the exact one might vary
    const googleButtonSelectors = [
      'button:has-text("Login with Google")',
      'button:has-text("Sign in with Google")',
      '[data-provider="google"]',
      '.google-login-button',
    ];

    // Try each selector until we find the button
    for (const selector of googleButtonSelectors) {
      try {
        await page.waitForSelector(selector, { timeout: 5000 });
        await page.click(selector);
        console.log('Found and clicked Google login button');
        break;
      } catch (e) {
        continue;
      }
    }

    // Wait longer to see the Google login popup and for manual interaction
    await page.waitForTimeout(30000); // 30 seconds to manually complete Google login
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await browser.close();
  }
}

run();
