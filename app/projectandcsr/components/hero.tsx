"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, X } from 'lucide-react';
import { HandHeart ,Heartbeat ,Pulse ,ShieldCheck ,Lightbulb ,FirstAid ,HandArrowUp   } from "@phosphor-icons/react/dist/ssr";
// Define the props interface
interface AboutheroProps {
  onTabChange: (tabs: string[]) => void; // Callback to update selected tabs
}

const Abouthero = ({ onTabChange }: AboutheroProps) => {
  // State to manage selected tabs
  const [selectedTabs, setSelectedTabs] = useState<string[]>([]);

  // Tab configuration
  const tabs = [
    { label: 'All Events', value: 'all',icon:<ArrowUpRight/> },
    { label: 'Food Donation', value: 'Food Donation', icon: <HandHeart size={22}/> },
    { label: 'Health Camp', value: 'Health Camp', icon: <Heartbeat size={22}/> },
    { label: 'Blood Donation', value: 'Blood Donation', icon: <Pulse size={22}/> },
    { label: 'Cyber Awareness', value: 'Cyber Awareness', icon: <ShieldCheck size={22}/>},
    { label: 'Rolbol Skill', value: 'Rolbol Skill', icon: <Lightbulb size={22}/> },
    { label: 'Girls Safety and Hygiene', value: 'Girls Safety and Hygiene', icon: <FirstAid size={22}/> },
    { label: 'Donate Now', value: 'Donate Now', icon: <HandArrowUp size={22}/> },
  ];

  // Toggle tab selection and notify parent
  const toggleTab = (value: string) => {
    const newSelectedTabs = selectedTabs.includes(value)
      ? selectedTabs.filter((t) => t !== value)
      : value === 'all'
      ? ['all']
      : selectedTabs.includes('all')
      ? [value]
      : [...selectedTabs, value];

    setSelectedTabs(newSelectedTabs);
    onTabChange(newSelectedTabs); // Pass updated tabs to parent
  };

  return (
    <div className="h-[88vh] md:h-[100vh] relative -mt-[80px] w-screen overflow-hidden">
      {/* Background Image */}
      <div className="overflow-hidden">
        <Image
          src="/bggradient.png"
          alt="Background Gradient"
          fill
          className="mix-blend-screen opacity-30 md:opacity-40 overflow-hidden -ml-[200px] md:ml-0 min-w-[800px] md:max-h-none md:max-w-none max-h-[500px] md:object-cover"
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 w-full flex flex-col items-center justify-center">
        <p className='btn-gradient-3 mt-24 !mb-2 px-3 py-1 text-[#f5f5f5] text-[16px] noto-sans flex rounded-[25px]'>Projects & CSR</p>
        <h1 className="md:text-[75px] max-w-7xl text-[36px] leading-[40px] text-center mb-4 md:mb-8 text-white md:leading-[80px] font-movatif">
        Empowering Communities Through 
          <span className="gradient-text"> Projects & CSR</span>
        </h1>
        <div className="text-center flex max-w-6xl flex-col items-center justify-center">
          <p className="text-[#f5f5f5]/70  text-[16px] mb-14">
          Empowering Communities Through Innovative Projects: Our Commitment to Corporate Social Responsibility (CSR) Drives Sustainable Development and Positive Change in the Lives of Those We Serve.
          </p>

          {/* Tabs */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => toggleTab(tab.value)}
                className={`btn-gradient-3 !mb-2 px-6 py-3 text-[16px] noto-sans flex rounded-[25px] ${
                  selectedTabs.includes(tab.value) || (tab.value === 'all' && selectedTabs.length === 0)
                    ? 'bg-purple-600 text-white opacity-100 '
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 opacity-50'
                } transition-colors relative`}
              >
                {tab.icon && <span className='mr-2 '>{tab.icon}</span>}
                <span>{tab.label}</span>
                {selectedTabs.includes(tab.value) && (
                  <X
                    className="w-4 h-4 mt-1 ml-2 cursor-pointer text-white hover:text-gray-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTab(tab.value);
                    }}
                  />
                )}
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Abouthero;