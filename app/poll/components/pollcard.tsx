"use client";
import React, { useState } from 'react';

interface PollCardProps {
  question: string;
  subtitle: string;
  options: string[];
  date: string;
  isActive: boolean;
}

const PollCard: React.FC<PollCardProps> = ({ question, subtitle, options, date, isActive }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState<{ [key: string]: number }>({
    'Research and connections': 0,
    'Market data access': 5, // Initial vote of 5
    'Mentorship opportunities': 0,
    'Discounts and events': 0,
  });

  const handleVote = () => {
    if (isActive && selectedOption && !hasVoted) {
      setVotes((prev) => {
        const newVotes = { ...prev };
        newVotes[selectedOption] = (newVotes[selectedOption] || 0) + 1; // Add your vote
        return newVotes;
      });
      setHasVoted(true);
      console.log(`Voted for: ${selectedOption}`);
    }
  };

  const calculatePercentage = (option: string) => {
    const voteCount = votes[option] || 0;
    const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 1); // Avoid division by zero
    return Math.round((voteCount / totalVotes) * 100);
  };

  return (
    <div className="bg-black rounded-2xl p-6 shadow-md max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-semibold text-white mb-2">{question}</h2>
      <p className="text-gray-400 text-sm mb-4">{subtitle}</p>
      <p className="text-gray-500 text-xs mb-4 float-right">{date}</p>
      <div className="space-y-2">
        {options.map((option) => (
          <div
            key={option}
            className={`relative p-3 rounded-lg cursor-pointer bg-gray-900 overflow-hidden ${
              selectedOption === option && !hasVoted ? 'text-white' : 'text-gray-400'
            }`}
            onClick={() => isActive && !hasVoted && setSelectedOption(option)}
          >
            {/* Progress bar as background, shown only after voting */}
            {hasVoted && (
              <div
                className="absolute inset-0 bg-gradient-to-r from-gray-900 to-purple-600 opacity-70"
                style={{
                  width: `${calculatePercentage(option)}%`,
                  transition: 'width 0.3s ease-in-out',
                }}
              />
            )}
            <div className="relative z-10 flex justify-between items-center">
              <span className="text-sm">{option}</span>
              {hasVoted && <span className="text-sm text-gray-400">{calculatePercentage(option)}%</span>}
            </div>
          </div>
        ))}
      </div>
      <button
        className={`mt-6 w-full py-2 rounded-full text-sm font-medium transition-colors ${
          isActive && !hasVoted && selectedOption
            ? 'bg-white text-black hover:bg-gray-200'
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
        }`}
        disabled={!isActive || hasVoted || !selectedOption}
        onClick={handleVote}
      >
        {isActive ? (hasVoted ? 'Voted' : 'Vote Now') : 'Vote Ended'}
      </button>
    </div>
  );
};

export default PollCard;