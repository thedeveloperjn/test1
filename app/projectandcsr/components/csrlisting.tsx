"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
interface AboutListingProps {
  selectedTabs: string[]; // Prop to receive selected tabs from Abouthero
}

const AboutListing = ({ selectedTabs }: AboutListingProps) => {
  // Sample data for initiatives or projects
  const initiatives = [
    {
      title: 'Food Donation Drives',
      description: 'Description for the Event, this  is lorem ipsum short event',
      date: 'Ongoing',
      image:'/initiativesbanner.jpeg',
      category: 'Food Donation',
      link: '/projects-and-csr?category=Food Donation',
    },
    {
      title: 'Health Awareness Camps',
      description: 'Offering free health check-ups and education in rural areas.',
      date: 'Quarterly',
      image:'/initiativesbanner.jpeg',
      category: 'Health Camp',
      link: '/projects-and-csr?category=Health Camp',
    },
    {
      title: 'Cyber Safety Workshops',
      description: 'Educating youth on online safety and digital literacy.',
      date: 'Bi-Annually',
      image:'/initiativesbanner.jpeg',
      category: 'Cyber Awareness',
      link: '/projects-and-csr?category=Cyber Awareness',
    },
    {
        title: 'Food Donation Drives',
        description: 'Description for the Event, this  is lorem ipsum short event',
        date: 'Ongoing',
        image:'/initiativesbanner.jpeg',
        category: 'Rolbol Skill',
        link: '/projects-and-csr?category=Food Donation',
      },
      {
        title: 'Health Awareness Camps',
        description: 'Offering free health check-ups and education in rural areas.',
        date: 'Quarterly',
        image:'/initiativesbanner.jpeg',
        category: 'Girls Safety and Hygiene',
        link: '/projects-and-csr?category=Health Camp',
      },
      {
        title: 'Cyber Safety Workshops',
        description: 'Educating youth on online safety and digital literacy.',
        date: 'Bi-Annually',
        image:'/initiativesbanner.jpeg',
        category: 'Donate Now',
        link: '/projects-and-csr?category=Cyber Awareness',
      },
      {
        title: 'Food Donation Drives',
        description: 'Description for the Event, this  is lorem ipsum short event',
        date: 'Ongoing',
        image:'/initiativesbanner.jpeg',
        category: 'Food Donation',
        link: '/projects-and-csr?category=Food Donation',
      },
      {
        title: 'Health Awareness Camps',
        description: 'Offering free health check-ups and education in rural areas.',
        date: 'Quarterly',
        image:'/initiativesbanner.jpeg',
        category: 'Health Camp',
        link: '/projects-and-csr?category=Health Camp',
      },
      {
        title: 'Cyber Safety Workshops',
        description: 'Educating youth on online safety and digital literacy.',
        date: 'Bi-Annually',
        image:'/initiativesbanner.jpeg',
        category: 'Cyber Awareness',
        link: '/projects-and-csr?category=Cyber Awareness',
      },
      {
        title: 'Food Donation Drives',
        description: 'Description for the Event, this  is lorem ipsum short event',
        date: 'Ongoing',
        image:'/initiativesbanner.jpeg',
        category: 'Blood Donation',
        link: '/projects-and-csr?category=Food Donation',
      },
      {
        title: 'Health Awareness Camps',
        description: 'Offering free health check-ups and education in rural areas.',
        date: 'Quarterly',
        image:'/initiativesbanner.jpeg',
        category: 'Health Camp',
        link: '/projects-and-csr?category=Health Camp',
      },
      {
        title: 'Cyber Safety Workshops',
        description: 'Educating youth on online safety and digital literacy.',
        date: 'Bi-Annually',
        image:'/initiativesbanner.jpeg',
        category: 'Cyber Awareness',
        link: '/projects-and-csr?category=Cyber Awareness',
      },
  ];

  // Filter initiatives based on selected tabs
  const filteredInitiatives = selectedTabs.includes('all') || selectedTabs.length === 0
    ? initiatives
    : initiatives.filter((initiative) => selectedTabs.includes(initiative.category));

  return (
    <div className="bg-white text-white py-12 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
        {filteredInitiatives.map((initiative, index) => (
            <div  key={index} >
                          <div className="w-[390px] mb-[25px] md:mb-[0px] space-y-1">
                            <Image
                              src={initiative.image}
                              width={360}
                              height={225}
                              style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "225px",
                                borderRadius: "12px",
                                marginBottom: "14px",
                              }}
                              unoptimized
                              alt={initiative.title}
                            />
                            <p className="text-[16px] noto-sans flex items-center text-[#02000A]/70">{initiative.category}<span className="h-1 w-1 rounded-full bg-[#02000A]/70 mx-1 inline-block"></span>{initiative.date}</p>
                            <h2 className="text-[#02000A] capitalize text-[24px] font-movatif">{initiative.title}</h2>
                            <p className="text-[16px] noto-sans text-[#02000A]/70">{initiative.description}</p>
                            
                          </div>
                        </div>
        ))}
      </div>
    </div>
  );
};

export default AboutListing;