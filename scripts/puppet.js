const puppeteer = require('puppeteer');
const fs = require('fs');

const MIN_PROGRAMS = 3;
const CONCURRENT_BROWSERS = 1;
const STATS_FILE = 'puppet-stats.json';
const SKIP_INDEX = 254;
const MAX_ATTEMPTS = 2;

let completedUrls = 0;
let averageTimePerUrl;

// Load previous statistics if they exist
try {
  const stats = JSON.parse(fs.readFileSync(STATS_FILE));
  averageTimePerUrl = stats.averageTimePerUrl;
} catch (e) {
  averageTimePerUrl = null;
}

async function processBatch(urls, batchIndex, totalUrls, startTime) {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    ignoreDefaultArgs: ['--enable-automation'],
    args: ['--window-size=1024,768'],
  });

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);

  try {
    for (const url of urls) {
      const pageStartTime = Date.now();
      await page.goto(url, { waitUntil: 'networkidle0' });

      const finalProgramCount = await checkAndCreatePrograms(page, url);
      const pageEndTime = Date.now();
      const pageTimeTaken = (pageEndTime - pageStartTime) / 1000;

      // Update progress and timing information
      completedUrls++;
      const percentComplete = ((completedUrls / totalUrls) * 100).toFixed(2);
      const totalTimeTaken = (pageEndTime - startTime) / 1000;
      const averageTimePerUrl = totalTimeTaken / completedUrls;
      const remainingUrls = totalUrls - completedUrls;
      const estimatedRemainingSeconds =
        remainingUrls * (averageTimePerUrl / CONCURRENT_BROWSERS);
      const estimatedFinishTime = new Date(
        Date.now() + estimatedRemainingSeconds * 1000
      );

      console.log(`[Browser ${batchIndex}] URL: ${url}`);
      console.log(
        `[Browser ${batchIndex}] Final Total Filtered Programs: ${finalProgramCount}`
      );
      console.log(
        `[Browser ${batchIndex}] Page Time: ${pageTimeTaken.toFixed(2)}s`
      );
      console.log(
        `[Browser ${batchIndex}] Total Time: ${totalTimeTaken.toFixed(2)}s`
      );
      console.log(
        `Overall Progress: ${completedUrls}/${totalUrls} (${percentComplete}%)`
      );
      console.log(
        `Estimated Finish Time: ${estimatedFinishTime.toLocaleString()}`
      );
      console.log('-------------------');

      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  } catch (error) {
    console.error(`[Browser ${batchIndex}] An error occurred:`, error);
  } finally {
    await browser.close();
  }
}

async function run() {
  const startTime = Date.now();
  const urlCombinations = generateUrlCombinations();
  const skippedUrlCombinations = urlCombinations.slice(SKIP_INDEX);
  const totalUrls = skippedUrlCombinations.length;
  completedUrls = 0; // Reset counter at start

  // Split URLs into batches for each browser
  const batchSize = Math.ceil(totalUrls / CONCURRENT_BROWSERS);
  const batches = [];

  for (let i = 0; i < totalUrls; i += batchSize) {
    batches.push(skippedUrlCombinations.slice(i, i + batchSize));
  }

  console.log(`Skipping first ${SKIP_INDEX} URLs`);
  console.log(`Starting ${CONCURRENT_BROWSERS} browsers with ${batchSize} URLs each`);
  console.log(`Total URLs to process: ${totalUrls}`);
  console.log(
    `Estimated time per URL from previous runs: ${averageTimePerUrl?.toFixed(2)}s`
  );
  if (averageTimePerUrl) {
    const estimatedTotalTime =
      (totalUrls * averageTimePerUrl) / CONCURRENT_BROWSERS;
    const estimatedFinishTime = new Date(
      Date.now() + estimatedTotalTime * 1000
    );
    console.log(
      `Initial estimated finish time: ${estimatedFinishTime.toLocaleString()}`
    );
  }
  console.log('-------------------');

  try {
    // Start all browsers concurrently
    const promises = batches.map((batch, index) =>
      processBatch(batch, index + 1, totalUrls, startTime)
    );

    // Wait for all browsers to complete
    await Promise.all(promises);

    const totalTimeTaken = (Date.now() - startTime) / 1000;
    const finalAverageTime = totalTimeTaken / totalUrls;

    // Save stats for next run
    fs.writeFileSync(
      STATS_FILE,
      JSON.stringify({
        averageTimePerUrl: finalAverageTime,
        lastRun: new Date().toISOString(),
      })
    );

    console.log(`Total execution time: ${totalTimeTaken.toFixed(2)}s`);
    console.log(`Average time per URL: ${finalAverageTime.toFixed(2)}s`);
  } catch (error) {
    console.error('Fatal error:', error);
  }
}

// Modified to accept page parameter
async function checkAndCreatePrograms(page, url, attempts = 0) {
  if (attempts >= MAX_ATTEMPTS) {
    console.log(`Reached maximum attempts (${MAX_ATTEMPTS}) for creating programs`);
    return 'max attempts reached';
  }

  try {
    await new Promise(resolve => setTimeout(resolve, 4000));
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
      console.log(
        `Found ${programCount} programs, which is less than minimum ${MIN_PROGRAMS}. Creating new program... (Attempt ${attempts + 1}/${MAX_ATTEMPTS})`
      );

      try {
        await page.click('button[id="create-program-button"]');
        await page.waitForNavigation({
          waitUntil: 'networkidle0',
          timeout: 60000
        });
        await new Promise(resolve => setTimeout(resolve, 10000));

        await page.click('button[id="submit-program-button"]');
        await page.waitForNavigation({
          waitUntil: 'networkidle0',
          timeout: 60000
        });
        await new Promise(resolve => setTimeout(resolve, 5000));

        await page.goto(url, {
          waitUntil: 'networkidle0',
          timeout: 60000
        });
        return await checkAndCreatePrograms(page, url, attempts + 1);
      } catch (navigationError) {
        console.log(`Navigation error during program creation: ${navigationError.message}`);
        await page.goto(url, {
          waitUntil: 'networkidle0',
          timeout: 60000
        });
        return await checkAndCreatePrograms(page, url, attempts + 1);
      }
    }

    return totalProgramsText;
  } catch (error) {
    console.log(`Error in checkAndCreatePrograms: ${error.message}`);
    return 'error occurred';
  }
}

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

run();
