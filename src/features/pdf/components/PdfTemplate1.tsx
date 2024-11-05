// components/ActivityTemplate.tsx
import React from 'react';

import { Program } from '@/features/program/types/Program';

interface ActivityTemplateProps {
  program: Program;
}

const template = (program: Program): string => `
  <div class="w-[210mm] mx-auto bg-white rounded-xl p-8 relative overflow-hidden">
    <!-- Header Section -->
    <div class="flex justify-between items-start mb-8">
      <div>
        <h1 class="text-4xl font-bold text-black mb-4">${program.title}</h1>
        <div class="flex flex-wrap gap-2">
          ${program.tags.type
            .map(
              (tag, index) => `
                <span class="bg-red-800 text-white px-4 py-1 rounded-full text-sm font-medium">
                  ${index === 0 ? `<span class="flex items-center gap-1">⏰ ${tag}</span>` : tag}
                </span>
              `
            )
            .join('')}
        </div>
      </div>

      <div class="w-48 h-48 rounded-full overflow-hidden bg-gray-100">
        <img
          src="/api/placeholder/200/200"
          alt="Dog"
          class="w-full h-full object-cover"
        />
      </div>
    </div>

    <!-- Materials Section -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-black mb-4">Materials Needed:</h2>
      <ul class="list-disc pl-5 space-y-2">
        ${program.materialsNeeded
          .split(',')
          .map(
            item => `
              <li class="text-gray-800">${item}</li>
            `
          )
          .join('')}
      </ul>
    </div>

    <!-- Setup Section -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-black mb-4">Setup</h2>
      <p class="text-gray-800">${program.setup}</p>
    </div>

    <!-- Instructions Section -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-black mb-4">Instructions</h2>
      <ol class="list-decimal pl-5 space-y-4">
        ${program.instructions
          .split(',')
          .map(
            instruction => `
              <li class="text-gray-800">${instruction}</li>
            `
          )
          .join('')}
      </ol>
    </div>

    <!-- Additional Tips Section -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-black mb-4">Additional Tips</h2>
      <ul class="list-disc pl-5 space-y-2">
        ${program.additionalTips
          .split(',')
          .map(
            tip => `
              <li class="text-gray-800">${tip}</li>
            `
          )
          .join('')}
      </ul>
    </div>

    <!-- Corner Decoration -->
    <div class="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br from-indigo-900 to-blue-800 transform rotate-90"></div>
  </div>
`;

// Function to get HTML string
export const getActivityHTML1 = (program: Program): string => {
  return template(program);
};

// React component version
export const PDFTemplate1: React.FC<ActivityTemplateProps> = ({ program }) => {
  // Using dangerouslySetInnerHTML since we control the content
  return <div dangerouslySetInnerHTML={{ __html: template(program) }} />;
};
