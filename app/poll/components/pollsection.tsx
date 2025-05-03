"use client";
import React from 'react';
import PollCard from './pollcard';

const VotePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl md:text-5xl font-semibold mb-12 font-movatif">Let's Vote</h1>
      <PollCard
        question="What's the biggest benefit of joining the ROLBOL?"
        subtitle="What's the biggest benefit of joining the ROLBOL? Select one"
        options={['Research and connections', 'Market data access', 'Mentorship opportunities', 'Discounts and events']}
        date="Vote Till: Jan 30"
        isActive={true}
      />
    </div>
  );
};

export default VotePage;