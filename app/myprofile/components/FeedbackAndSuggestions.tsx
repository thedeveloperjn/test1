"use client";
import React, { useState, FormEvent } from 'react';

const FeedbackAndSuggestions: React.FC = () => {
  // State to manage the feedback input
  const [feedback, setFeedback] = useState('');

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Placeholder for form submission logic
    console.log('Feedback submitted:', feedback);
    // Reset the form after submission
    setFeedback('');
  };

  return (
    <div className="bg-[#f5f5f5]/5 rounded-[12px] pb-3 min-h-[84vh]">
   <h1 className='text-[32px] text-[#f5f5f5] py-3 px-6 font-movatif border-b border-[#f5f5f5]/10'>Feedback & Suggestions</h1>
     
      {/* Form Section */}
      <div className='flex h-[72vh] justify-center items-center'>
      <div className="space-y-4 m-4 w-[400px] h-[400px] bg-[#ffffff0d] p-5  rounded-[14px]">
        <h3 className="text-xl md:text-[22px] font-movatif mb-4">Send Your Feedback & Suggestion</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full bg-[#ffffff0d] h-[235px] text-white p-4 rounded-lg border border-[#f5f5f5]/15 focus:outline-none focus:border-[#f5f5f5]/30 resize-none"
            rows={4}
            placeholder="How about trying out a new coffee shop in your neighborhood? It’s a great way to explore and enjoy a cozy atmosphere!"
          />
          <button
            type="submit"
            className="bg-white w-full text-black px-6 py-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            Send Feedback
          </button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default FeedbackAndSuggestions;