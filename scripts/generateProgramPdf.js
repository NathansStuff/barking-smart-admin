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
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${program.title}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

          body {
            font-family: 'Inter', Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 40px;
            color: #333;
            background: linear-gradient(135deg, #2B2B5E 0%, #5B6B9A 100%);
            min-height: 100vh;
          }

          .container {
            background: white;
            border-radius: 12px;
            padding: 40px;
            max-width: 1000px;
            margin: 0 auto;
            position: relative;
            overflow: hidden;
          }

          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 40px;
          }

          .title {
            font-size: 2.5em;
            font-weight: 700;
            color: #000;
            margin: 0;
          }

          .tags {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin-bottom: 20px;
          }

          .tag {
            background: #8B1D24;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
          }

          .time-tag {
            display: flex;
            align-items: center;
            gap: 5px;
          }

          .time-tag::before {
            content: "⏰";
            font-size: 16px;
          }

          .section {
            margin: 30px 0;
          }

          .section-title {
            font-size: 1.8em;
            font-weight: 700;
            color: #000;
            margin-bottom: 20px;
          }

          ul, ol {
            margin: 0;
            padding-left: 20px;
          }

          li {
            margin-bottom: 15px;
          }

          .image-container {
            position: absolute;
            top: 40px;
            right: 40px;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            overflow: hidden;
          }

          .image-placeholder {
            width: 100%;
            height: 100%;
            background: #f0f0f0;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
          }

          .corner-decoration {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 200px;
            height: 200px;
            background: linear-gradient(135deg, #2B2B5E 0%, #5B6B9A 100%);
            clip-path: polygon(100% 0, 100% 100%, 0 100%);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div>
              <h1 class="title">${program.title}</h1>
              <div class="tags">
                <span class="tag time-tag">${program.tags.duration}</span>
                ${program.tags.type.map(tag => `<span class="tag">${tag}</span>`).join('')}
              </div>
            </div>
          </div>

          <div class="section">
            <h2 class="section-title">Materials Needed:</h2>
            <ul>
              ${program.materialsNeeded
                .split(',')
                .map(item => `<li>${item.trim()}</li>`)
                .join('')}
            </ul>
          </div>

          <div class="section">
            <h2 class="section-title">Setup</h2>
            <p>${program.setup}</p>
          </div>

          <div class="section">
            <h2 class="section-title">Instructions</h2>
            <ol>
              ${program.instructions
                .split('\n')
                .map(item => `<li>${item.replace(/^\d+\.\s*/, '')}</li>`)
                .join('')}
            </ol>
          </div>

          <div class="section">
            <h2 class="section-title">Additional Tips</h2>
            <ul>
              ${program.additionalTips
                .split('\n')
                .map(tip => `<li>${tip.trim()}</li>`)
                .join('')}
            </ul>
          </div>

          <div class="corner-decoration"></div>
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
    printBackground: true,
  });

  await browser.close();
  return pdfPath;
}

// Example usage
async function main() {
  try {
    const puzzleTreatProgram = {
      title: 'PUZZLE TREAT BOX ADVENTURE',
      description:
        'An engaging puzzle game for dogs that combines mental stimulation with treats.',
      materialsNeeded:
        'A small cardboard box (like a shoebox) or a basket, 3-5 smaller containers or items that can hold treats, Toilet paper rolls (fold the ends to create a treat tube), Small Tupperware containers with lids (with a hole for sniffing), Socks or small cloth pouches, High-value treats (like small bits of dog kibble or favorite treats)',
      setup:
        "Place the smaller containers inside the cardboard box or basket. You can cover the main box with a cloth or leave it open, depending on your dog's comfort with different levels of challenge.",
      instructions:
        "1. Introduce the Game: Show your dog the treats before placing them in the containers to get them excited. Let them sniff around the box so they know there's something worth working for.\n2. Encourage Problem Solving: Place the box on the floor and encourage your dog to explore it. Cheer them on as they sniff, paw, or nudge to get to the treats.\n3. Provide Hints (if needed): If your dog seems stuck, you can give them a little hint by opening one container slightly or guiding them with your hand. Keep encouraging them so they feel successful as they work through the puzzle.\n4. Celebrate Wins: Each time your dog solves a part of the puzzle, give them gentle praise or a small reward to keep them engaged and motivated.",
      additionalTips:
        'Repeat and Rotate: You can repeat this activity a few times, swapping out different types of containers to keep it fresh.\nIncrease Challenge Over Time: Once your dog masters the basics, you can make it a bit harder by adding more containers or by partially hiding the main box under a light cover.',
      tags: {
        duration: '10Min',
        type: ['INDOORS', 'EASY', 'SCENT', 'AGILITY', 'MENTAL'],
        space: 'SMALL',
      },
    };

    const pdfPath = await generatePDF(puzzleTreatProgram);
    console.log(`PDF generated successfully at: ${pdfPath}`);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
}

main();
