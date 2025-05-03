"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionItemProps {
  title: string;
  content: string;
  isOpenByDefault?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
  isOpenByDefault = false,
}) => {
  const [isOpen, setIsOpen] = useState(isOpenByDefault);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordian-grad  btn-gradient-2">
      <button
        onClick={toggleAccordion}
        className=" relative w-full flex justify-between z-[50] items-center py-4 text-white text-lg font-semibold focus:outline-none"
      >
        <h3 className="font-movatif text-[22px] md:text-[32px] leading-[54px] ">{title}</h3>
        <div className="relative w-6 h-6 flex items-center mx-4 justify-center">
          {/* Vertical Line (Static) */}
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bg-white h-6 w-[2px] rounded"
            style={{
              top: "0%",
              left: "96%",
              transform: "translate(-50%, -50%)",
            }}
          />
          {/* Horizontal Line (Rotates 90 degrees) */}
          <motion.div
            className="absolute bg-white h-[2px] w-6 rounded"
            style={{
              top: "51%",
              left: "100%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="text-[#f5f5f5] text-[16px] opacity-70 noto-sans pb-3 mb-4">{content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Accordion: React.FC = () => {
  return (
    <div className="w-full p-3 max-w-[1270px] mx-auto">
      {/* Static Open Section (Core Values) */}
      <div
        className="accordian-grad !p-[34px] md:!p-10  btn-gradient-2
 "
      >
        <div className="mb-8 md:mb-14">
          <div className="w-full flex justify-between items-center text-white text-lg font-semibold">
            <h3 className="font-movatif text-[32px] leading-[32px] md:text-[54px] md:leading-[54px] mb-12">
              About Us
            </h3>
          </div>
          <p className="text-[22px] text-[#f5f5f5] opacity-70 mb-4 font-movatif">
            At RoLBOL, we celebrate our journey through community, innovation,
            resilience, and joy.
          </p>
          <div className="text-[#f5f5f5] text-[16px] opacity-70 noto-sans">
            At RoLBOL, we take pride in our shared journey, emphasizing four
            essential values that guide us: community, where everyone feels
            included; innovation, which drives our creativity; resilience,
            helping us overcome challenges; and joy, celebrating every success
            together. These values not only define who we are but also inspire
            us to grow and thrive as a united team.
          </div>
        </div>
        <div className="flex md:flex-row flex-col justify-between">
          <div className="md:w-[48%] w-[100%] mb-8 md:mb-0">
            <div className="w-full flex justify-between items-center text-white text-lg font-semibold">
              <h3 className="font-movatif text-[22px] md:text-[32px] leading-[24px] md:leading-[54px] mb-4">
                Our Vision
              </h3>
            </div>
            <div className="text-[#f5f5f5] text-[16px] opacity-70 noto-sans">
            The Rolbol Talks celebrate our vibrant community with an eye-catching banner that invites curiosity. Expect engaging discussions, hands-on workshops, and valuable networking opportunities. This event promises inspiring speakers and innovative ideas. Join us to connect with fellow innovators and celebrate creativity. Save the date for this remarkable gathering!
            </div>
          </div>
          <div className="md:w-[48%] w-[100%]">
            <div className="w-full flex justify-between items-center text-white text-lg font-semibold">
              <h3 className="font-movatif text-[22px] md:text-[32px] leading-[24px] md:leading-[54px] mb-4">
                Our Mission
              </h3>
            </div>
            <div className="text-[#f5f5f5] text-[16px] opacity-70 noto-sans">
            The Rolbol Talks celebrate our vibrant community with an eye-catching banner that invites curiosity. Expect engaging discussions, hands-on workshops, and valuable networking opportunities. This event promises inspiring speakers and innovative ideas.
            </div>
          </div>
        </div>
      </div>

      {/* Accordion Items */}
      <AccordionItem
        title="Core Values"
        content="The Rolbol Talks celebrate our vibrant community with an eye-catching banner that invites curiosity. Expect engaging discussions, hands-on workshops, and valuable networking opportunities. This event promises inspiring speakers and innovative ideas. Join us to connect with fellow innovators and celebrate creativity. Save the date for this remarkable gathering!"
      />
      <AccordionItem
        title="Objective"
        content="The Rolbol Talks celebrate our vibrant community with an eye-catching banner that invites curiosity. Expect engaging discussions, hands-on workshops, and valuable networking opportunities. This event promises inspiring speakers and innovative ideas. Join us to connect with fellow innovators and celebrate creativity. Save the date for this remarkable gathering!"
      />
      <AccordionItem
        title="Code of Ethics"
        content="The Rolbol Talks celebrate our vibrant community with an eye-catching banner that invites curiosity. Expect engaging discussions, hands-on workshops, and valuable networking opportunities. This event promises inspiring speakers and innovative ideas. Join us to connect with fellow innovators and celebrate creativity. Save the date for this remarkable gathering!"
      />
    </div>
  );
};

export default Accordion;
