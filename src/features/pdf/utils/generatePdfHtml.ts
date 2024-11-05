import { ProgramWithId } from '@/features/program/types/Program';

import { getPdfVariation } from './getPdfVariation';

// Extract shared HTML template
export function generatePdfHtml(
  program: ProgramWithId,
  variation: number
): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${program.title}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          * { font-family: 'Inter', sans-serif; }
          @page { size: A4; margin: 0; }
          body {
            margin: 0;
            width: 793.7px;  /* Exact A4 width in pixels */
            min-height: 297mm;
          }
          .pdf-container {
            width: 793.7px;
            min-height: 297mm;
            padding: 0;
            margin: 0;
            background: white;
          }
          .content-wrapper { padding: 2rem; }
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
}
