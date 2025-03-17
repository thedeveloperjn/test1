"use client";
import { useState } from "react";
import PodcastList from "../components/podcastlist";
import Link from "next/link";

const categories = [
  { name: "All topics", value: "all" },
  { name: "Leadership", value: "leadership" },
  { name: "Happiness", value: "happiness" },
  { name: "Health", value: "health" },
  { name: "Business", value: "business" },
  { name: "Mindset", value: "mindset" },
  { name: "Relationships", value: "relationships" },
  { name: "Wealth", value: "wealth" },
];

const PodcastSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div>
      <section className="bg-black py-10 pb-48 mx-8 md:pt-20">
        <div className="wrapper grid grid-cols-1 items-end gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h1 className="text-balance text-[82px] font-movatif text-white">
              The ROLBOL Podcast
            </h1>
          </div>
          <div>
            <p className=" text-[20px] text-[#ffffff99]">
              Absorb the powerful words and insightful lessons from Tony Robbins to help create meaningful change in your life. Hear from Tony himself and some of the world’s most successful minds with an extensive selection of episodes.
            </p>
          </div>
          <div className="py-5 lg:col-span-2">
            <nav className="w-full max-w-lg">
              <ul className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <li key={index}>
                    <button
                      onClick={() => setSelectedCategory(category.value)}
                      className={`flex text-white text-nowrap rounded-full border border-[#ffffff25] px-4 py-2 md:py-3 md:px-6 text-sm font-medium leading-none duration-500 hover:border-[#ffffff66] text-contrast hover:text-contrast/50 ${
                        selectedCategory === category.value
                          ? "border-transparent bg-white/20"
                          : "border-primary-1"
                      }`}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>
      <PodcastList selectedCategory={selectedCategory} />
    </div>
  );
};

export default PodcastSection;
