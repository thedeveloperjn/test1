
import { XLogo } from "@phosphor-icons/react/dist/ssr"; 
import { ChevronRight,PhoneCall ,Mail ,MapPin ,Youtube ,Linkedin ,Instagram ,Heart   } from 'lucide-react';
import { quickLinks, initiatives, projectsCSR, insights } from '../data';
import Link from 'next/link';
const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="flex flex-wrap md:flex-nowrap w-[100%] pt-20 pb-8">
          {/* Contact/Info Section (Static) */}
          <div className="w-[100%] md:w-[30%] md:px-20 pb-10 md:pb-0">
            <Link href="/"><img src="/logo.svg" alt="" /></Link>
            <div className="space-y-6 mt-6">
              <p className="flex text-[14px] md:text-[16px] items-center text-[#F5F5F5] noto-sans opacity-70">
                <span className="mr-2 "><PhoneCall size={20} /></span> +91 7000012394
              </p>
              <p className="flex text-[14px] md:text-[16px] items-center text-[#F5F5F5] noto-sans opacity-70">
                <span className="mr-2 "><Mail size={20} /></span> support@rolbol.com
              </p>
              <p className="flex text-[14px] md:text-[16px] items-start text-[#F5F5F5] noto-sans opacity-70">
                <span className="mr-2 "><MapPin size={20} /></span>
                Office No. 440, 4th Floor, Progressive Point, Lalpur, Raipur, Chhattisgarh 492001
              </p>
            </div>
          </div>

          {/* Quick Links Section (Dynamic) */}
          <div className="w-[55%] md:w-[20%] pb-10 md:pb-0">
            <h3 className="text-[18px] font-lighter font-movatif  mb-4">Quick Links</h3>
            <ul className="space-y-4 ">
              {quickLinks.map((item, index) => (
                <li
                key={index}
                className="group flex items-center text-[#F5F5F5] opacity-70 hover:!text-white hover:opacity-100 transition-all"
              >
                <ChevronRight className="w-4 h-4 mr-2 " />
                <a href={item.link} className="noto-sans text-[14px] md:text-[16px] group-hover:translate-x-[6px] group-hover:scale-[1.05] transition-all">
                  {item.title}
                </a>
              </li>
              
              ))}
            </ul>
          </div>

          {/* Initiatives Section (Dynamic) */}
          <div className="w-[45%] md:w-[20%] pb-10 md:pb-0">
            <h3 className="text-[18] font-movatif  mb-4">Initiatives</h3>
            <ul className="space-y-4">
              {initiatives.map((item, index) => (
               <li
               key={index}
               className="group flex items-center text-[#F5F5F5] opacity-70 hover:!text-white hover:opacity-100 transition-all"
             >
               <ChevronRight className="w-4 h-4 mr-2 " />
               <a href={item.link} className="noto-sans text-[14px] md:text-[16px] group-hover:translate-x-[6px] group-hover:scale-[1.05] transition-all">
                 {item.title}
               </a>
             </li>
              ))}
            </ul>
          </div>

          {/* Projects & CSR Section (Dynamic) */}
          <div className="w-[55%] md:w-[20%]"> 
            <h3 className="text-[18] font-movatif  mb-4">Projects & CSR</h3>
            <ul className="space-y-4">
              {projectsCSR.map((item, index) => (
               <li
               key={index}
               className="group flex items-center text-[#F5F5F5] opacity-70 hover:!text-white hover:opacity-100 transition-all"
             >
               <ChevronRight className="w-4 h-4 mr-2 " />
               <a href={item.link} className="noto-sans text-[14px] md:text-[16px] group-hover:translate-x-[6px] group-hover:scale-[1.05] transition-all">
                 {item.title}
               </a>
             </li>
              ))}
            </ul>
          </div>

          {/* Insights Section (Dynamic) */}
          <div className="w-[45%] md:w-[20%]">
            <h3 className="text-[18] font-movatif  mb-4">Insights</h3>
            <ul className="space-y-4">
              {insights.map((item, index) => (
               <li
               key={index}
               className="group flex items-center text-[#F5F5F5] opacity-70 hover:!text-white hover:opacity-100 transition-all"
             >
               <ChevronRight className="w-4 h-4 mr-2 " />
               <a href={item.link} className="noto-sans text-[14px] md:text-[16px] group-hover:translate-x-[6px] group-hover:scale-[1.05] transition-all">
                 {item.title}
               </a>
             </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section (Static) */}
        <div className="border-y border-[#ffffff22] mt-8 py-10 mt-2 md:px-20 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-wrap justify-center space-y-4 md:space-y-0 md:space-x-8 mb-4 noto-sans md:mb-0">
            <a href="/privacy-policy" className="text-[#F5F5F5] w-[50%] md:w-auto text-center opacity-70 hover:!text-white">Privacy Policy</a>
            <a href="/terms-conditions" className="text-[#F5F5F5] w-[50%] md:w-auto text-center opacity-70 hover:!text-white">Terms & Conditions</a>
            <a href="/shipping-policy" className="text-[#F5F5F5] w-[50%] md:w-auto text-center opacity-70 hover:!text-white">Shipping Policy</a>
            <a href="/newsletter" className="text-[#F5F5F5] w-[50%] md:w-auto text-center opacity-70 hover:!text-white">Newsletter</a>
          </div>
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><Youtube /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><Linkedin /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><XLogo size={26} /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><Instagram /></a>
          </div>

        </div>

        {/* Copyright (Static) */}
        <div className="text-sm text-center mt-4 text-[#F5F5F5] flex md:flex-row flex-col space-y-4 md:space-y-0 justify-between opacity-70 md:px-20 py-2  noto-sans">
          <p>© Copyright Rolbol Community Forum 2025</p>
          <p className="text-sm flex justify-center w-[100%] md:w-auto">Made with <Heart size={18}  className='mx-1 !fill-[white]' /> by Technolitics.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;