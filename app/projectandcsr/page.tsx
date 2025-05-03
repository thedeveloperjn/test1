"use client"
import Abouthero from './components/hero';
import AboutListing from './components/csrlisting';
import { useState } from 'react';
import About from '../components/extras/about';

export default function home() {
  const [selectedTabs, setSelectedTabs] = useState<string[]>([]);

  return (
    <div>
      <Abouthero onTabChange={setSelectedTabs} />
      <AboutListing selectedTabs={selectedTabs} />
     <About/>
    </div>
  );
}