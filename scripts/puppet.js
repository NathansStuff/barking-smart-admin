const puppeteer = require('puppeteer');

const MIN_PROGRAMS = 3;

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    ignoreDefaultArgs: ['--enable-automation'],
    args: ['--window-size=1024,768'],
  });

  try {
    const page = await browser.newPage();
    const urlCombinations = generateUrlCombinations();

    for (const url of urlCombinations) {
      // Navigate to each URL
      await page.goto(url, {
        waitUntil: 'networkidle0',
      });

      async function checkAndCreatePrograms(url) {
        // Get current program count
        const totalProgramsText = await page.evaluate(() => {
          const xpath = "//*[contains(text(), 'Filtered Programs')]";
          const element = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          ).singleNodeValue;
          if (element) {
            const text = element.textContent;
            return text.match(/Filtered Programs:\s*(\d+)/)?.[1] || 'not found';
          }
          return 'not found';
        });

        const programCount = parseInt(totalProgramsText);
        if (!isNaN(programCount) && programCount < MIN_PROGRAMS) {
          console.log(`Found ${programCount} programs, which is less than minimum ${MIN_PROGRAMS}. Creating new program...`);
          await page.click('button[id="create-program-button"]');
          await page.waitForNavigation({ waitUntil: 'networkidle0' });
          await new Promise(resolve => setTimeout(resolve, 10000));
          await page.click('button[id="submit-program-button"]');

          // Return to original URL and recursively check again
          await page.goto(url, { waitUntil: 'networkidle0' });
          return checkAndCreatePrograms(url);
        }

        return totalProgramsText;
      }

      const finalProgramCount = await checkAndCreatePrograms(url);
      console.log(`URL: ${url}`);
      console.log(`Final Total Filtered Programs: ${finalProgramCount}`);
      console.log('-------------------');

      // Add a small delay between requests to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    console.log('Closing browser');
    await browser.close();
  }
}

run();

const filters = {
  location: ['all', 'INDOORS', 'OUTDOORS'],
  energyLevel: ['all', 'LOW', 'MEDIUM', 'HIGH'],
  duration: ['all', 'QUICK', 'MID', 'LONG'],
  challenge: ['all', 'EASY', 'MEDIUM', 'HARD'],
  space: ['all', 'SMALL', 'MEDIUM', 'LARGE'],
  type: ['all', 'SCENT', 'AGILITY', 'PUZZLE'],
};

function generateUrlCombinations() {
  const urls = [];

  for (const location of filters.location) {
    for (const energyLevel of filters.energyLevel) {
      for (const duration of filters.duration) {
        for (const challenge of filters.challenge) {
          for (const space of filters.space) {
            for (const type of filters.type) {
              const params = new URLSearchParams();

              if (location !== 'all') params.set('location', location);
              if (energyLevel !== 'all') params.set('energyLevel', energyLevel);
              if (duration !== 'all') params.set('duration', duration);
              if (challenge !== 'all') params.set('challenge', challenge);
              if (space !== 'all') params.set('space', space);
              if (type !== 'all') params.set('type', type);

              const queryString = params.toString();
              const url = `http://localhost:3000/program/${queryString ? `?${queryString}` : ''}`;
              urls.push(url);
            }
          }
        }
      }
    }
  }

  return urls;
}

const urlCombinations = generateUrlCombinations();
console.log('Total combinations:', urlCombinations.length);
console.log('URLs:', JSON.stringify(urlCombinations, null, 2));
console.log('Length:', urlCombinations.length);

// Save to file
const fs = require('fs');
fs.writeFileSync(
  'url-combinations.json',
  JSON.stringify(urlCombinations, null, 2)
);
