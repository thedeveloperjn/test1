// components/ContactForm.js
import React from 'react';
import FormField from './formfields';

import { XLogo ,FacebookLogo ,LinkedinLogo ,InstagramLogo ,WhatsappLogo ,Globe   } from "@phosphor-icons/react/dist/ssr"; 
import { PhoneCall ,MapPin ,Mail } from 'lucide-react';
const ContactForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  text-white p-4">
      <div className="flex flex-col lg:flex-row w-full max-w-[1450px] lg:justify-between overflow-hidden">
        {/* Form Section */}
        <div className="w-full lg:w-[60%] md:p-8">
          <form className="space-y-6">
            {/* Full Name */}
            <FormField
              number="01"
              label="What’s Your Full Name?"
              placeholder="Type Your Full Name..."
            />

            {/* Contact Number */}
            <FormField
              number="02"
              label="What’s Your Contact Number?"
              placeholder="Type Your Contact Number..."
            />

            {/* Email Address */}
            <FormField
              number="03"
              label="What’s Your Email Address?"
              placeholder="Type Your Email Address..."
              type="email"
            />

            {/* City */}
            <FormField
              number="04"
              label="Which City Are You Located In?"
              placeholder="Type Your Current City Name..."
            />

            {/* Remarks */}
            <FormField
              number="05"
              label="Do You Have Any Remark?"
              placeholder="Type Your Remark..."
            />

            <div className='w-[100%] flex md:justify-start justify-center items-center'>
              <button
                type="submit"
                className="button-blur font-movatif !w-full md:!w-auto btn-gradient-3   !px-14 !py-6 md:!py-8" >
                Submit Form
              </button>
            </div>
          </form>
     
        </div>
        <div className="relative w-[1px]  max-h-full bg-black">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f5f5f5]/10 to-transparent"></div>
  </div>
        {/* Contact Info Section */}
        <div className="w-full lg:w-[34%]   p-1 flex flex-col ">
          <div className='space-y-8 '>
            <h2 className="text-[32px] text-[#f5f5f5] font-movatif font-bold ">Contact Us</h2>
            <div className="mt-4  space-y-8">
              <div className="flex text-[16px]  md:text-[18px]  items-center space-x-2">
                <span className="border border-[2px] border-[#f5f5f5]/10 p-2 mr-4 rounded-full"><PhoneCall className='text-[#f5f5f5]/70'/></span>
                <div className='flex flex-col text-[#f5f5f5]/70'><span>+91 77479-77999</span><span>+91 77479-77999</span></div>
              </div>
             
              <div className="flex text-[16px]  md:text-[18px]  items-center space-x-2">
                <span className="border border-[2px] border-[#f5f5f5]/10 p-2 mr-4 rounded-full"><Mail className='text-[#f5f5f5]/70'/></span>
                <div className='flex flex-col text-[#f5f5f5]/70'><p>example@gmail.com</p></div>
              </div>
              <div className="flex text-[16px]  md:text-[18px] items-center space-x-2">
                <span className="border border-[2px] border-[#f5f5f5]/10 p-2 mr-4 rounded-full"><MapPin className='text-[#f5f5f5]/70'/></span>
                <div className='flex flex-col text-[#f5f5f5]/70'><p>Kachna Pahuch Marg, Opp. to HDFC Bank, Geetanjali Colony, Shankar Nagar, Raipur, Chhattisgarh 492001</p></div>
              </div>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-10">
            <a href="#" className="bg-[#f5f5f5]/10 p-2 rounded-[8px] hover:text-white">
              <span className='text-[25px] bg-[#f5f5f5]/30' ><FacebookLogo/></span> {/* Placeholder for Facebook */}
            </a>
            <a href="#" className="bg-[#f5f5f5]/10 p-2 rounded-[8px] hover:text-white">
              <span className='text-[25px]'><XLogo/></span> {/* Placeholder for Instagram */}
            </a>
            <a href="#" className="bg-[#f5f5f5]/10 p-2 rounded-[8px] hover:text-white">
              <span className='text-[25px]'><LinkedinLogo /></span> {/* Placeholder for LinkedIn */}
            </a>
            <a href="#" className="bg-[#f5f5f5]/10 p-2 rounded-[8px] hover:text-white">
              <span className='text-[25px]'><InstagramLogo /></span> {/* Placeholder for LinkedIn */}
            </a>
          </div>

          <div
        className="accordian-grad px-0 !p-[20px] mt-10 btn-gradient-2
 "
      >
        <div className='space-y-4' >
          <div >
            <h3 className="font-movatif text-[32px] leading-[32px] md:text-[22px] md:leading-[24px] ">
            Raipur Chapter
            </h3>
          </div>
          <p className="text-[16px] md:text-[18px] text-[#f5f5f5] opacity-70 mb-4 flex font-movatif">
            <MapPin/>  Shankar Nagar, Raipur, Chhattisgarh 492001
          </p>
          <div className="flex space-x-4">
              <a href="#" className="bg-[#f5f5f5]/10 p-2 rounded-[8px] hover:text-white">
                <span className='text-[25px]'><PhoneCall/></span>
              </a>
              <a href="#" className="bg-[#f5f5f5]/10 p-2 rounded-[8px] hover:text-white">
                <span className='text-[25px]'><Mail/></span>
              </a>
              <a href="#" className="bg-[#f5f5f5]/10 p-2 rounded-[8px] hover:text-white">
                <span className='text-[25px]'><WhatsappLogo/></span>
              </a>
              <a href="#" className="bg-[#f5f5f5]/10 p-2 rounded-[8px] hover:text-white">
                <span className='text-[25px]'><Globe/></span>
              </a>
              <a href="#" className="bg-[#f5f5f5]/10 p-2 rounded-[8px] hover:text-white">
                <span className='text-[25px]'><MapPin/></span>
              </a>
            </div>
        </div>
      </div>

        </div>
      </div>
    </div>
  );
};

export default ContactForm;