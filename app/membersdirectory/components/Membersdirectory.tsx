import React from 'react';
import MemberCard from './membercard';

// Define the type for a member
interface Member {
  name: string;
  title: string;
  chapter: string;
  business?: string;
  member?:string;
  image: string; // URL or path to the image
}

// Sample JSON data for members (you can move this to a separate file if needed)
const membersData: Member[] = [
  {
    name: 'Rahul Dodeja',
    title: 'President, Raipur Chapter',
    chapter: 'Raipur Chapter',
    member:'Pioneer',
    business: 'Finance Consultant & Educator',
    image: '/rameshkothari.jpg', // Replace with actual image path
  },
  {
    name: 'Dr. Ramesh Kothari',
    title: 'Member, Raipur Chapter',
    chapter: 'Raipur Chapter',
    member:'',
    business: 'Business Name & Type',
    image: '/rameshkothari.jpg',
  },
  {
    name: 'Dr. Ramesh Kothari',
    title: 'Member, Raipur Chapter',
    chapter: 'Raipur Chapter',
    member:'',
    business: 'Business Name & Type',
    image: '/rameshkothari.jpg',
  },
  {
    name: 'Dr. Ramesh Kothari',
    title: 'Radiation Oncologist',
    chapter: 'Raipur Chapter',
    member:'',
    business: 'Sanjeevani CBCC USA Cancer Hos...',
    image: '/rameshkothari.jpg',
  },
  {
    name: 'Dr. Ramesh Kothari',
    title: 'Member, Raipur Chapter',
    chapter: 'Raipur Chapter',
    member:'Pioneer',
    business: 'Business Name & Type',
    image: '/rameshkothari.jpg',
  },
  {
    name: 'Rahul Dodeja',
    title: 'President, Raipur Chapter',
    chapter: 'Raipur Chapter',
    member:'Pioneer',
    business: 'Finance Consultant & Educator',
    image: '/rameshkothari.jpg', // Replace with actual image path
  },
  {
    name: 'Dr. Ramesh Kothari',
    title: 'Member, Raipur Chapter',
    chapter: 'Raipur Chapter',
    member:'',
    business: 'Business Name & Type',
    image: '/rameshkothari.jpg',
  },
  {
    name: 'Dr. Ramesh Kothari',
    title: 'Member, Raipur Chapter',
    chapter: 'Raipur Chapter',
    member:'',
    business: 'Business Name & Type',
    image: '/rameshkothari.jpg',
  },
  {
    name: 'Dr. Ramesh Kothari',
    title: 'Radiation Oncologist',
    chapter: 'Raipur Chapter',
    member:'',
    business: 'Sanjeevani CBCC USA Cancer Hos...',
    image: '/rameshkothari.jpg',
  },
  {
    name: 'Dr. Ramesh Kothari',
    title: 'Member, Raipur Chapter',
    chapter: 'Raipur Chapter',
    member:'Pioneer',
    business: 'Business Name & Type',
    image: '/rameshkothari.jpg',
  }, {
    name: 'Rahul Dodeja',
    title: 'President, Raipur Chapter',
    chapter: 'Raipur Chapter',
    member:'Pioneer',
    business: 'Finance Consultant & Educator',
    image: '/rameshkothari.jpg', // Replace with actual image path
  },
  {
    name: 'Dr. Ramesh Kothari',
    title: 'Member, Raipur Chapter',
    chapter: 'Raipur Chapter',
    member:'',
    business: 'Business Name & Type',
    image: '/rameshkothari.jpg',
  },
  {
    name: 'Dr. Ramesh Kothari',
    title: 'Member, Raipur Chapter',
    chapter: 'Raipur Chapter',
    member:'',
    business: 'Business Name & Type',
    image: '/rameshkothari.jpg',
  },
  {
    name: 'Dr. Ramesh Kothari',
    title: 'Radiation Oncologist',
    chapter: 'Raipur Chapter',
    member:'',
    business: 'Sanjeevani CBCC USA Cancer Hos...',
    image: '/rameshkothari.jpg',
  },
  {
    name: 'Dr. Ramesh Kothari',
    title: 'Member, Raipur Chapter',
    chapter: 'Raipur Chapter',
    member:'Pioneer',
    business: 'Business Name & Type',
    image: '/rameshkothari.jpg',
  }, {
    name: 'Rahul Dodeja',
    title: 'President, Raipur Chapter',
    chapter: 'Raipur Chapter',
    member:'Pioneer',
    business: 'Finance Consultant & Educator',
    image: '/rameshkothari.jpg', // Replace with actual image path
  },
  {
    name: 'Dr. Ramesh Kothari',
    title: 'Member, Raipur Chapter',
    chapter: 'Raipur Chapter',
    member:'',
    business: 'Business Name & Type',
    image: '/rameshkothari.jpg',
  },
  {
    name: 'Dr. Ramesh Kothari',
    title: 'Member, Raipur Chapter',
    chapter: 'Raipur Chapter',
    member:'',
    business: 'Business Name & Type',
    image: '/rameshkothari.jpg',
  },
  {
    name: 'Dr. Ramesh Kothari',
    title: 'Radiation Oncologist',
    chapter: 'Raipur Chapter',
    member:'',
    business: 'Sanjeevani CBCC USA Cancer Hospital',
    image: '/rameshkothari.jpg',
  },
  {
    name: 'Dr. Ramesh Kothari',
    title: 'Member, Raipur Chapter',
    chapter: 'Raipur Chapter',
    member:'Pioneer',
    business: 'Business Name & Type',
    image: '/rameshkothari.jpg',
  },
];

// MemberCard Component
// MembersDirectory Component
const MembersDirectory: React.FC = () => {
  return (
    <div className="max-w-[1400px] mx-auto text-white p-4 md:p-6 rounded-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
        <h2 className="text-[32px] md:text-[54px]  font-movatif font-bold mb-4">Members Directory</h2>
        <div className="relative flex w-full md:w-auto items-center">
          <input
            type="text"
            placeholder="Search by Name, City, or Business Type"
            className="text-white placeholder-gray-400 w-full md:w-auto rounded-full py-2 px-4 btn-gradient-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
      </div>
      {/* Members Grid */}
      <div className="flex flex-wrap gap-[7px] space-y-4 md:gap-[20px]">
        {membersData.map((member, index) => (
          <MemberCard
            key={index} 
            name={member.name}
            title={member.title}
            chapter={member.chapter}
            business={member.business}
            member={member.member}
            image={member.image}
          />
        ))}
      </div>
    </div>
  );
};

export default MembersDirectory;