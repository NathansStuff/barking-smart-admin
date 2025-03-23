import puppeteer from 'puppeteer';

import { ProgramWithId } from '@/features/program/types/Program';

import { generatePdfHtml } from './generatePdfHtml';

// Extract shared PDF generation logic
export async function generatePdf(program: ProgramWithId, variation: number): Promise<Uint8Array> {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.setContent(generatePdfHtml(program, variation));
    await page.setViewport({
      width: 794, // Rounded up from 793.7
      height: 1123,
    });

    return await page.pdf({
      width: '210mm',
      height: '297mm',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      scale: 1.0,
      preferCSSPageSize: true,
    });
  } finally {
    await browser.close();
  }
}
