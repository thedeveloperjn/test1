import Link from "next/link";
import React from "react";

const MoreInfoCard = () => {
  return (
    <div className="bg-[#fdf7f2] p-6 flex flex-col md:flex-row justify-between items-start gap-6">
      {/* Left Section */}
      <div className="lg:w-[60%] flex flex-col justify-between gap-8 text-gray-800 font-light font-public-sans">
        <div>
          <strong>Giftingsaga Company Limited</strong>, No. 3, SIPCOT Industrial
          Complex, Hosur-635126, Krishnagiri District, Raipur
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-2  ">
          <div className=" lg:col-span-1 col-span-1 lg:space-y-8 space-y-2 ">
            <p className="font-light text-gray-500 sm:text-base text-sm">
              Country of Origin
            </p>
            <p className="font-light text-gray-500 sm:text-base text-sm">
              Net Quantity
            </p>
          </div>
          <div className=" lg:col-span-2 col-span-1 lg:space-y-8 space-y-2 font-medium sm:text-base text-sm">
            <p>India</p> <p>1 Unit</p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="lg:w-[40%]  text-gray-800 space-y-4 lg:border-l border-gray-300 lg:px-8 py-0">
        <p className="text-brown-700 font-bold sm:text-lg text-sm leading-4">
          Got any Queries?
        </p>
        <p className="sm:text-sm text-xs">
          We’re here for you. Feel free to contact our customer care executives.
        </p>
        <div className="grid lg:grid-cols-3  grid-cols-3  ">
          <div className=" lg:col-span-1 col-span-1 lg:space-y-8 space-y-4">
            <p className="font-light text-gray-500 sm:text-base text-sm">
              Contact Us
            </p>
            <p className="font-light text-gray-500 sm:text-base text-sm">
              Email Us
            </p>
          </div>
          <div className=" lg:col-span-2 col-span-2 lg:space-y-8 space-y-4 font-medium text-[#F3238A] sm:text-base text-sm">
            <Link href={"tel:9999999999"} className="block">
              +91-9999999999
            </Link>
            <Link
              href={"mailto:customcare@giftingsaga.com"}
              className="block text-wrap"
            >
              info@giftingsaga.com
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreInfoCard;
