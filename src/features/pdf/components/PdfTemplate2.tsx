// components/ActivityTemplate2.tsx
import React from 'react';

import { Program } from '@/features/program/types/Program';

interface ActivityTemplateProps {
  program: Program;
}

const template = (program: Program): string => `
  <div class="w-[210mm] mx-auto bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-10 relative overflow-hidden">
    <!-- Decorative Elements -->
    <div class="absolute top-0 left-0 w-32 h-32 bg-purple-200 rounded-full opacity-20 -translate-x-16 -translate-y-16"></div>
    <div class="absolute bottom-0 right-0 w-40 h-40 bg-blue-200 rounded-full opacity-20 translate-x-20 translate-y-20"></div>

    <!-- Header Section -->
    <div class="flex flex-col md:flex-row justify-between items-center gap-8 mb-12 relative">
      <div class="text-center md:text-left">
        <h1 class="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
          ${program.title}
        </h1>
        <div class="flex flex-wrap gap-2 justify-center md:justify-start">
          ${program.tags.type
            .map(
              (tag, index) => `
                <span class="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg text-sm font-semibold shadow-md">
                  ${index === 0 ? `<span class="flex items-center gap-2">🎯 ${tag}</span>` : tag}
                </span>
              `
            )
            .join('')}
        </div>
      </div>

      <div class="w-56 h-56 rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
        <img
          src="/api/placeholder/200/200"
          alt="Activity Image"
          class="w-full h-full object-cover"
        />
      </div>
    </div>

    <!-- Content Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Materials Section -->
      <div class="bg-white p-8 rounded-xl shadow-lg">
        <h2 class="text-2xl font-bold text-purple-600 mb-6 flex items-center gap-2">
          <span class="text-2xl">🎨</span> Materials Needed
        </h2>
        <ul class="space-y-3">
          ${program.materialsNeeded
            .split(',')
            .map(
              (item) => `
                <li class="flex items-center gap-2 text-gray-700">
                  <span class="w-2 h-2 bg-purple-400 rounded-full"></span>
                  ${item.trim()}
                </li>
              `
            )
            .join('')}
        </ul>
      </div>

      <!-- Setup Section -->
      <div class="bg-white p-8 rounded-xl shadow-lg">
        <h2 class="text-2xl font-bold text-blue-600 mb-6 flex items-center gap-2">
          <span class="text-2xl">⚙️</span> Setup
        </h2>
        <p class="text-gray-700 leading-relaxed">${program.setup}</p>
      </div>

      <!-- Instructions Section -->
      <div class="bg-white p-8 rounded-xl shadow-lg md:col-span-2">
        <h2 class="text-2xl font-bold text-purple-600 mb-6 flex items-center gap-2">
          <span class="text-2xl">📝</span> Instructions
        </h2>
        <ol class="space-y-4">
          ${program.instructions
            .split(',')
            .map(
              (instruction, index) => `
                <li class="flex gap-4 items-start">
                  <span class="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg flex items-center justify-center font-bold">
                    ${index + 1}
                  </span>
                  <p class="text-gray-700 pt-1">${instruction.trim()}</p>
                </li>
              `
            )
            .join('')}
        </ol>
      </div>

      <!-- Additional Tips Section -->
      <div class="bg-white p-8 rounded-xl shadow-lg md:col-span-2">
        <h2 class="text-2xl font-bold text-blue-600 mb-6 flex items-center gap-2">
          <span class="text-2xl">💡</span> Additional Tips
        </h2>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${program.additionalTips
            .split(',')
            .map(
              (tip) => `
                <li class="bg-blue-50 p-4 rounded-lg text-gray-700 flex items-start gap-3">
                  <span class="text-blue-500 flex-shrink-0">•</span>
                  ${tip.trim()}
                </li>
              `
            )
            .join('')}
        </ul>
      </div>
    </div>
  </div>
`;

// Function to get HTML string
export const getActivityHTML2 = (program: Program): string => {
  return template(program);
};

// React component version
export const PDFTemplate2: React.FC<ActivityTemplateProps> = ({ program }) => {
  return <div dangerouslySetInnerHTML={{ __html: template(program) }} />;
};
