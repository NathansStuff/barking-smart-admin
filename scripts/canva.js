const puppeteer = require('puppeteer');
const fs = require('fs');

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function navigateToCanvaDesign(page) {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            ignoreDefaultArgs: ['--enable-automation'],
            args: ['--window-size=1024,768'],
        });

        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(60000);
        // Navigate to the specific Canva design
        await page.goto(
            'https://www.canva.com/design/DAGVOf-1XbY/gAPXyy5vDMJiPaIieq0WXg/edit',
            {
                waitUntil: 'networkidle0',
                timeout: 60000, // 60 second timeout
            }
        );

        // Get and save the HTML content
        const html = await page.content();
        fs.writeFileSync('canva-page.html', html);
        console.log('HTML content saved to canva-page.html');

        // Wait for the page to load properly
        await page.waitForSelector('body', { timeout: 30000 });

        // Try different possible selectors for the design title
        const selectors = [
            'span[data-text-content*="Puzzle Treat Box Adventure"]',
            'h4.lnCPoA',  // Based on the HTML structure you shared
            '[role="heading"]',
            '.fFOiLQ' // Another class from your HTML
        ];

        // Try each selector
        for (const selector of selectors) {
            try {
                const element = await page.waitForSelector(selector, { timeout: 5000 });
                if (element) {
                    console.log(`Found element with selector: ${selector}`);
                    // If found, you can click it or perform other actions
                    await element.click();
                    break;
                }
            } catch (err) {
                console.log(`Selector ${selector} not found, trying next...`);
            }
        }

        // Add additional waiting time for the page to stabilize
        await delay(2000);

        // Log the current URL to help with debugging
        console.log('Current URL:', await page.url());

        // Wait a bit for the text editor to be active
        await delay(1000);

        // Select all existing text (Ctrl+A) and type new text
        await page.keyboard.down('Control');
        await page.keyboard.press('a');
        await page.keyboard.up('Control');
        await page.keyboard.type('NEW HEADING');

        console.log('Successfully updated text');

        // Optional: Wait a few seconds to see the change
        await delay(3000);

        // Optional: Close the browser
        // await browser.close();
    } catch (error) {
        console.error('Navigation error:', error);
        // Optionally take a screenshot for debugging
        await page.screenshot({ path: 'debug-screenshot.png' });
        throw error;
    }
}

navigateToCanvaDesign();
