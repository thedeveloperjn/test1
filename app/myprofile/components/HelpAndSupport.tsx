"use client";
import React, { useState } from 'react';
import { CaretDown  } from "@phosphor-icons/react/dist/ssr";
const HelpAndSupport: React.FC = () => {
  // State to track which accordion item is open (null if none are open)
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Sample FAQ data
  const faqs = [
    {
      question: 'How do I reset my password?',
      answer:
        'To reset your password, go to the login page and click on "Forgot Password". Follow the instructions to receive a password reset link via email. If you encounter any issues, please contact support at support@example.com. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra orRolbole, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.',
    },
    {
      question: 'How can I update my profile information?',
      answer:
        'You can update your profile information by navigating to the "My Profile" tab in your dashboard. Click on the "Edit Profile" button, make your changes, and save them. Ensure all required fields are filled out correctly.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra orRolbole, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.',
    },
    {
      question: 'What should I do if I encounter a bug?',
      answer:
        'If you encounter a bug, please report it via the "Feedback & Suggestions" tab. Provide a detailed description of the issue, including steps to reproduce it, and our team will look into it as soon as possible.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra orRolbole, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.',
    },
  ];

  // Function to toggle an accordion item
  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#f5f5f5]/5 rounded-[12px] pb-3 min-h-[84vh]">
   <h1 className='text-[32px] text-[#f5f5f5] py-3 px-6 font-movatif border-b border-[#f5f5f5]/10'>Help & Support</h1>
      <div className=' m-5 '>
        <div className='flex flex-col items-center justify-center mt-12'>
      <h3 className="text-xl md:text-[40px] text-center font-movatif mb-2">
        Do you need assistance? <br /> We’re here to help!
      </h3>
      <p className="text-[18px] noto-sans text-[#bababa] mb-5">
        We’d love to help you with any questions or concerns you may have. Our team is here to provide support.
      </p>
      <button className="bg-white text-black px-6 py-2 rounded-full mb-8 hover:bg-gray-200 transition-colors">
        Contact Support
      </button>
</div>
      {/* Accordion Section */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
          key={index}
          className={`border-b border-[#f5f5f5]/15 last:border-b-0`} // Remove border for the last item
        >
            {/* Accordion Header */}
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
            >
              <span className="text-[18px] noto-sans text-[#f5f5f5]">{faq.question}</span>
              <span
                className={`transform transition-transform duration-900 ${
                  openIndex === index ? 'rotate-180' : 'rotate-0'
                }`}
              >
                <CaretDown  size='25'/>
              </span>
            </button>
            {/* Accordion Content */}
            <div
              className={`overflow-hidden transition-all duration-1000 ease-in-out ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <p className="text-[16px] text-[#bababa] noto-sans mb-8">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default HelpAndSupport;