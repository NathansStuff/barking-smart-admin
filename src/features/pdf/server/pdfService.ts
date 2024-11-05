import puppeteer from 'puppeteer';

import { Program } from '@/features/program/types/Program';

import { getPdfVariation } from '../utils/getPdfVariation';

export async function generatePdfService(
  program: Program,
  variation: number
): Promise<Uint8Array> {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${program.title}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
            * {
              font-family: 'Inter', sans-serif;
            }
            @page {
              size: A4;
              margin: 0;
            }
            body {
              margin: 0;
              width: 793.7px;  /* Exact A4 width in pixels */
              min-height: 297mm;
            }
            .pdf-container {
              width: 793.7px;  /* Exact A4 width in pixels */
              min-height: 297mm;
              padding: 0;
              margin: 0;
              background: white;
            }
            .content-wrapper {
              padding: 2rem;
            }
          </style>
        </head>
        <body>
          <div class="pdf-container">
            <div class="content-wrapper">
              ${getPdfVariation(variation, program)}
            </div>
          </div>
        </body>
      </html>
    `;

  await page.setContent(html);

  // Set viewport to exact A4 size in pixels
  await page.setViewport({
    width: 794, // Rounded up from 793.7
    height: 1123,
  });

  const pdf = await page.pdf({
    width: '210mm',
    height: '297mm',
    printBackground: true,
    margin: {
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
    },
    scale: 1.0,
    preferCSSPageSize: true,
  });

  await browser.close();

  return pdf;
}
