// components/ActivityTemplate.tsx
import React from 'react';

import { Program } from '@/features/program/types/Program';

interface ActivityTemplateProps {
  program: Program;
}

const template = (program: Program): string => `
 <div class="w-[210mm] min-h-[297mm] mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8 relative overflow-hidden font-sans">
    <!-- Header Section -->
    <div class="flex justify-between items-start mb-8">
      <div class="w-3/4">
        <h1 class="text-4xl font-bold text-indigo-900 mb-4">${program.title}</h1>
        <p class="text-lg text-indigo-700 mb-4">${program.description}</p>
        <div class="flex flex-wrap gap-2">
          ${program.tags.type
            .map(
              (tag, index) => `
                <span class="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-sm">
                  ${index === 0 ? `<span class="flex items-center gap-1">🏷️ ${tag}</span>` : tag}
                </span>
              `
            )
            .join('')}
        </div>
      </div>
      <div class="w-48 h-48 rounded-full overflow-hidden bg-white shadow-lg">
        <img
          src="/api/placeholder/200/200"
          alt="Activity illustration"
          class="w-full h-full object-cover"
        />
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-2 gap-8">
      <!-- Left Column -->
      <div>
        <!-- Materials Section -->
        <div class="mb-8 bg-white rounded-lg p-6 shadow-md">
          <h2 class="text-2xl font-bold text-indigo-800 mb-4">Materials Needed</h2>
          <ul class="list-disc pl-5 space-y-2">
            ${program.materialsNeeded
              .split(',')
              .map(
                item => `
                  <li class="text-indigo-700">${item.trim()}</li>
                `
              )
              .join('')}
          </ul>
        </div>

        <!-- Setup Section -->
        <div class="mb-8 bg-white rounded-lg p-6 shadow-md">
          <h2 class="text-2xl font-bold text-indigo-800 mb-4">Setup</h2>
          <p class="text-indigo-700">${program.setup}</p>
        </div>
      </div>

      <!-- Right Column -->
      <div>
        <!-- Instructions Section -->
        <div class="mb-8 bg-white rounded-lg p-6 shadow-md">
          <h2 class="text-2xl font-bold text-indigo-800 mb-4">Instructions</h2>
          <ol class="list-decimal pl-5 space-y-4">
            ${program.instructions
              .split(',')
              .map(
                (instruction, index) => `
                  <li class="text-indigo-700">
                    <span class="font-semibold">Step ${index + 1}:</span> ${instruction.trim()}
                  </li>
                `
              )
              .join('')}
          </ol>
        </div>

        <!-- Additional Tips Section -->
        <div class="mb-8 bg-white rounded-lg p-6 shadow-md">
          <h2 class="text-2xl font-bold text-indigo-800 mb-4">Additional Tips</h2>
          <ul class="list-disc pl-5 space-y-2">
            ${program.additionalTips
              .split(',')
              .map(
                tip => `
                  <li class="text-indigo-700">${tip.trim()}</li>
                `
              )
              .join('')}
          </ul>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-8 bg-indigo-800 text-white p-4 rounded-lg shadow-md">
      <div class="flex justify-between items-center text-sm">
        <div>
          <span class="font-semibold">Location:</span> ${program.tags.location} |
          <span class="font-semibold">Energy Level:</span> ${program.tags.energyLevel}/10 |
          <span class="font-semibold">Duration:</span> ${program.tags.duration} |
          <span class="font-semibold">Challenge:</span> ${program.tags.challenge}
        </div>
        <div>
          <span class="font-semibold">Space:</span> ${program.tags.space}
        </div>
      </div>
    </div>

    <!-- Decorative Elements -->
    <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-200 rounded-full opacity-50 transform translate-x-1/3 -translate-y-1/3"></div>
    <div class="absolute bottom-0 left-0 w-64 h-64 bg-blue-200 rounded-full opacity-50 transform -translate-x-1/3 translate-y-1/3"></div>
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
