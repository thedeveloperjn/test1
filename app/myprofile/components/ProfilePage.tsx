"use client";
import { useState } from 'react';
import dynamic from 'next/dynamic';
import ProfileLanding from './ProfileLanding';
import Birthdays from './Birthdays';
import ProfileInquiries from './ProfileInquiries';
import Certificates from './Certificates';
import HelpAndSupport from './HelpAndSupport';
import FeedbackAndSuggestions from './FeedbackAndSuggestions';
import Image from 'next/image';
// Dynamically import Sidebar with SSR disabled and a fallback
const Sidebar = dynamic(() => import('./Sidebar'), {
  ssr: false,
  loading: () => <div className="w-[300px] bg-[#f5f5f5]/5 p-4 rounded-[12px] h-[84vh] animate-pulse" />,
});

// Define types for the member data
interface Member {
  name: string;
  title: string;
  userId: string;
  image: string;
  bio: string;
  professionalDetails: {
    role: string;
    industry: string;
  };
  businessDetails: {
    position: string;
  };
  contactDetails: {
    whatsappNumber: string;
    contactNumber: string;
    email: string;
    address: string;
  };
  dateOfBirth: string;
  bloodGroup: string;
  designation: string;
  businessName: string;
}

// Sample data for the member
const memberData: Member = {
  name: 'Mr. Rahul Dodeja',
  title: 'President, Raipur Chapter',
  userId: 'ROL0L0001',
  image: '/rameshkothari.jpg',
  bio: 'Leading the way for a Better Raipur!',
  professionalDetails: {
    role: 'Finance Consultant & Advisor',
    industry: 'Finance',
  },
  businessDetails: {
    position: 'Founder',
  },
  contactDetails: {
    whatsappNumber: '+91 7000039100',
    contactNumber: '+91 7000039100',
    email: 'rahuldodeja@gmail.com',
    address: 'Sunnyvale, Avenue, Shankar Nagar, Raipur, Chhattisgarh',
  },
  dateOfBirth: '27 Nov 1992',
  bloodGroup: 'O+',
  designation: 'President @ Raipur',
  businessName: 'Dodeja Advisory',
};


const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Profile');

  const tabs = [
    { label: 'Profile', component: <ProfileLanding {...memberData} /> },
    { label: 'Birthdays', component: <Birthdays /> },
    { label: 'Profile Inquiries', component: <ProfileInquiries /> },
    { label: 'Certificates', component: <Certificates /> },
    { label: 'Help & Support', component: <HelpAndSupport /> },
    { label: 'Feedback & Suggestions', component: <FeedbackAndSuggestions /> },
  ];

  return (
    <div className="flex text-white min-h-screen relative -mt-[80px] !pt-[100px] w-screen overflow-hidden md:p-6">

<div className="overflow-hidden">
      <Image src="/bggradient.png"  alt="Background Gradient" fill className="mix-blend-screen -z-[2] opacity-30 md:opacity-40 overflow-hidden -ml-[200px] md:ml-0 min-w-[800px] md:max-h-[800px] md:max-w-screen max-h-[500px] md:object-cover" /></div>
      <div className='flex  items-start '>
<div className="hidden md:block sticky top-[0]">
      <Sidebar
        userName={memberData.name}
        userTitle={memberData.title}
        userId={memberData.userId}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      </div>
      <div className="flex-1 p-4  md:pt-0">
        {/* Tab Content */}
        <div>{tabs.find((tab) => tab.label === activeTab)?.component}</div>
      </div>
      </div>
    </div>
  );
};

export default ProfilePage;

