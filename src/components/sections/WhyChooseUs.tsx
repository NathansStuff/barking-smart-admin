import React from 'react';

import { Activity, Brain, Target } from 'lucide-react';

import InfoSection from './InfoSection';

function WhyChooseUs(): React.JSX.Element {
  const items = [
    {
      icon: <Brain className='size-8 text-white' />,
      title: 'Mental Stimulation',
      description: "Engaging activities that challenge your dog's mind and prevent boredom.",
    },
    {
      icon: <Target className='size-8 text-white' />,
      title: 'Behavioural Improvement',
      description: "Structured programs to enhance your dog's overall behaviour and happiness.",
    },
    {
      icon: <Activity className='size-8 text-white' />,
      title: 'Daily Activities',
      description: "Fun, varied exercises tailored to your dog's energy level.",
    },
  ];

  return (
    <InfoSection
      heading='WHY CHOOSE BARKIN SMART?'
      items={items}
    />
  );
}

export default WhyChooseUs;
