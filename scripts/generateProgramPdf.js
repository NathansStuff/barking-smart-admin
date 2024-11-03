const puppeteer = require('puppeteer');
const path = require('path');

async function generatePDF(program) {
  const browser = await puppeteer.launch({
    headless: 'new',
  });

  const page = await browser.newPage();

  // Generate HTML content
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          h1 {
            color: #2563eb;
            border-bottom: 2px solid #2563eb;
            padding-bottom: 10px;
          }
          .section {
            margin: 20px 0;
          }
          .section-title {
            font-weight: bold;
            color: #1e40af;
            margin-bottom: 10px;
          }
          .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin: 10px 0;
          }
          .tag {
            background: #e5e7eb;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <h1>${program.title}</h1>

        <div class="section">
          <div class="section-title">Description</div>
          <p>${program.description}</p>
        </div>

        <div class="section">
          <div class="section-title">Materials Needed</div>
          <p>${program.materialsNeeded}</p>
        </div>

        <div class="section">
          <div class="section-title">Setup</div>
          <p>${program.setup}</p>
        </div>

        <div class="section">
          <div class="section-title">Instructions</div>
          <p>${program.instructions}</p>
        </div>

        <div class="section">
          <div class="section-title">Additional Tips</div>
          <p>${program.additionalTips}</p>
        </div>

        <div class="section">
          <div class="section-title">Program Details</div>
          <div class="tags">
            <span class="tag">Location: ${program.tags.location}</span>
            <span class="tag">Energy Level: ${program.tags.energyLevel}/10</span>
            <span class="tag">Duration: ${program.tags.duration}</span>
            <span class="tag">Challenge: ${program.tags.challenge}</span>
            <span class="tag">Space: ${program.tags.space}</span>
          </div>
          <div class="tags">
            ${program.tags.type.map(type => `<span class="tag">${type}</span>`).join('')}
          </div>
        </div>
      </body>
    </html>
  `;

  await page.setContent(html);

  // Generate PDF
  const pdfPath = path.join(
    process.cwd(),
    'generated',
    `${program.title.replace(/\s+/g, '-')}.pdf`
  );
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    margin: {
      top: '20px',
      right: '20px',
      bottom: '20px',
      left: '20px',
    },
    printBackground: true,
  });

  await browser.close();
  return pdfPath;
}

// Example usage
async function main() {
  try {
    const exampleProgram = {
      title: 'Example Program',
      description: 'This is an example program description.',
      materialsNeeded: 'Paper, pencils, markers',
      setup: 'Arrange tables in groups',
      instructions: '1. Start with...\n2. Then...',
      additionalTips: 'Make sure to...',
      tags: {
        location: 'INDOOR',
        energyLevel: 5,
        duration: 'THIRTY_MINUTES',
        challenge: 'MEDIUM',
        type: ['CRAFT', 'EDUCATIONAL'],
        space: 'SMALL',
      },
    };

    const pdfPath = await generatePDF(exampleProgram);
    console.log(`PDF generated successfully at: ${pdfPath}`);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
}

// Run the example
main();

module.exports = { generatePDF };
