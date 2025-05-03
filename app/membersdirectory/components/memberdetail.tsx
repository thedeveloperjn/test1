import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { BuildingOffice ,Briefcase  } from "@phosphor-icons/react/dist/ssr";
// Define the type for a member
interface MemberDetailProps {
  name: string;
  title: string;
  tagline: string;
  image: string;
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
  isPioneer: boolean;
}

// Sample data for the member (you can pass this as props from a parent component)
const memberData: MemberDetailProps = {
  name: 'Mr. Rahul Dodeja',
  title: 'President, Raipur Chapter',
  tagline: 'Leading the way for a brighter Raipur!',
  image: '/rameshkothari.jpg',
  professionalDetails: {
    role: 'Finance Consultant & Educator',
    industry: 'Finance',
  },
  businessDetails: {
    position: 'Founder at Dodeja Financial Advisors',
  },
  contactDetails: {
    whatsappNumber: '+91 7000032765',
    contactNumber: '+91 9929289111',
    email: 'rahuldodeja@gmail.com',
    address: 'Sunnyvale, Avenue, Shankar Nagar, Raipur, Chhattisgarh',
  },
  isPioneer: true,
};

// MemberDetail Component
const MemberDetail: React.FC<MemberDetailProps> = ({
  name,
  title,
  tagline,
  image,
  professionalDetails,
  businessDetails,
  contactDetails,
  isPioneer,
}) => {
  return (
    <div className="text-white p-4 md:p-6 rounded-lg min-h-screen max-w-[1250px] mt-[30px]  mx-auto flex flex-col md:flex-row  md:gap-6 gap-4">
      {/* Left Section: Image and Basic Info */}
            <div className="!overflow-x-hidden ">
            <Image src="/bggradient.png"  alt="Background Gradient" fill className="mix-blend-screen opacity-30 md:opacity-40 overflow-hidden -ml-[200px] md:ml-0 min-w-[800px] md:max-h-none md:max-w-none max-h-[500px] md:object-cover -z-[1]" /></div>
      <div className="flex flex-col md:w-[30%]">
        <div className="relative w-[100%] h-[100%] md:w-[300px] md:h-[300px]">
          <Image
            src={image}
            alt={name}
            width={300}
            height={300}
            className="w-full h-full object-cover rounded-lg"
          />
          
        </div>
         {/* Name and Title */}
         {isPioneer && (
            <div className="bg-purple-600 max-w-[144px] p-1 px-[16px] my-5 text-white text-[14px] noto-sans rounded-full">
              Pioneer Member
            </div>
          )}
         <div>
          <h1 className="text-[36px] md:text-[46px] font-movatif ">{name}</h1>
          <p className="text-[20px] noto-sans text-[#f5f5f5]/70">{title}</p>
        </div>
      </div>
      <div className="relative w-[1px]  max-h-full bg-black">
    <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-[#f5f5f5]/10 to-transparent"></div>
  </div>
      {/* Right Section: Details */}
      <div className="flex flex-col md:w-[45%] md:pl-[25px] space-y-8 ">
       

        {/* Tagline */}
        <p className="text-[32px] md:text-[42px] font-movatif  text-[#f5f5f5]">“{tagline}”</p>

        {/* Request to Connect Button */}
       

        {/* Professional Details */}
        <div>
          <h2 className="text-[16px] font-movatif text-[#f5f5f5]/70 mb-2">Professional Details</h2>
          <div className="flex space-x-2">
            <div className="flex items-center text-[#f5f5f5] text-[16px] gap-2">
              <span><Briefcase /></span>
              <p className='noto-sans'>{professionalDetails.role}</p>
            </div>
            <div className="flex items-center gap-2">
              <span><BuildingOffice /></span>
              <p className='noto-sans'>{professionalDetails.industry}</p>
            </div>
          </div>
        </div>

        {/* Business Details */}
        <div >
          <h2 className="text-[16px] font-movatif text-[#f5f5f5]/70 mb-2">Business Details</h2>
          <div className="flex items-center text-[#f5f5f5] text-[16px] gap-2">
            <span><Briefcase /></span>
            <p className='noto-sans'>{businessDetails.position}</p>
          </div>
        </div>

        {/* Contact Details */}
        <div>
          <h2 className="text-[16px] font-movatif text-[#f5f5f5]/70 mb-2">Contact Details</h2>
          <div className="space-y-8">
          <div className="space-x-6 flex">
            <div>
              <p className="text-[16px] noto-sans text-[#f5f5f5]/70 mb-2">WhatsApp Number</p>
              <p className='text-[16px] noto-sans'>{contactDetails.whatsappNumber}</p>
            </div>
            <div>
              <p className="text-[16px] noto-sans text-[#f5f5f5]/70 mb-2">Contact Number</p>
              <p className='text-[16px] noto-sans'>{contactDetails.contactNumber}</p>
            </div>
            </div>
            <div>
              <p className="text-[16px] noto-sans text-[#f5f5f5]/70 mb-2">Email Address</p>
              <p className='text-[16px] noto-sans'>{contactDetails.email}</p>
            </div>
            <div>
              <p className="text-[16px] noto-sans text-[#f5f5f5]/70 mb-2">Formal Address</p>
              <p className='text-[16px] noto-sans'>{contactDetails.address}</p>
            </div>
          </div>
        </div>

        {/* Request Phone Number Link */}
        <div>
          <a href="#" className="text-[#f5f5f5] noto-sans underline">
            Request Phone Number
          </a>
        </div>
      </div>
      <div className="flex md:w-[20%]  mt-10 md:justify-end">
          <button className="btn-gradient-3 px-6 max-h-[60px] items-center flex !rounded-[35px] py-3">
            Request to Connect <ArrowUpRight />
          </button>
        </div>
    </div>
  );
};

// Export the component with sample data (you can pass props dynamically in a real app)
const MemberDetailPage: React.FC = () => {
  return <MemberDetail {...memberData} />;
};

export default MemberDetailPage;