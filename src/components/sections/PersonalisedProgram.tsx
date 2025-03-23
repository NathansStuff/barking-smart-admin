import React from 'react';

import { PawPrint, Sparkles, Target } from 'lucide-react';

import InfoSection from './InfoSection';

function PersonalisedProgram(): React.JSX.Element {
  const items = [
    {
      icon: <PawPrint className='size-8 text-white' />,
      title: 'Tell Us About Your Dog',
      description:
        "Complete a quick, interactive form to share details about your dog's breed, personality, energy level, and more.",
    },
    {
      icon: <Sparkles className='size-8 text-white' />,
      title: 'Personalisation at Its Best',
      description: "We craft a custom exercise and enrichment plan designed to meet your dog's unique needs.",
    },
    {
      icon: <Target className='size-8 text-white' />,
      title: 'See the Results',
      description:
        'Receive your easy-to-follow plan and watch your dog thrive with smarter, more fulfilling activities.',
    },
  ];

  return (
    <InfoSection
      heading='YOUR DOGS PERSONALISED PROGRAM IN 3 STEPS'
      items={items}
    />
  );
}

export default PersonalisedProgram;
