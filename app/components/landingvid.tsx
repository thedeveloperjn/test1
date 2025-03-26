'use client';
import CircularText from './extras/circular';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { MoveUpRight } from 'lucide-react';

export default function DocumentaryHeader() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => console.error('Video playback failed:', error));
    }
  }, []);

  return (
    <section className="bg-black relative h-screen -mt-[80px] overflow-hidden">
      <CircularText className="absolute z-[10] bottom-[375px] md:bottom-[25%] right-[75px] md:right-[13%]" />
      <div className="wrapper wrapper--wide relative h-full">
        <div className="relative flex h-full items-end overflow-hidden bg-black">
          
          {/* Video Background */}
          <video
            ref={videoRef}
            loop
            playsInline
            autoPlay
            muted
            className="absolute inset-0 h-full w-full object-cover"
            src="https://cdnsnty.tonyrobbins.com/2024-04-30T18-51-24.269Z-Doc_Hero_SizzleTeaser.mp4"
          ></video>

          {/* Fade Effect Overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(circle, transparent 40%, rgba(0, 0, 0, 0.8) 80%),
                linear-gradient(to bottom, transparent 20%, black 100%),
                linear-gradient(to top, transparent 70%, black 100%),
                linear-gradient(to left, transparent 100%, black 100%),
                linear-gradient(to right, transparent 100%, black 100%)
              `
            }}
          ></div>

          {/* Content Section */}
          <div className="absolute md:bottom-[4%] bottom-[12%] flex w-[100%]  p-5 md:p-10">
            <div className="flex w-[100%]  flex-col items-start space-y-2  md:space-y-10 ">
              <div className=" w-full text-center md:text-left  flex justify-center md:justify-start items-center md:items-start  md:mx-1 md:w-full md:max-w-5xl">
                <h1 className="text-white min-w-[340px] max-w-[340px] md:min-w-[100%] md:max-w-[100%]  text-[32px] leading-[34px] text-center md:text-start md:leading-[56px] md:text-[54px] font-movatif">
                  Empowering lives through <br className=' hidden md:block' />
                  <span className="gradient-text">growth, wellness</span> and <span className="gradient-text">connection</span>
                </h1>
              </div>
              <div className='w-[100%] flex md:justify-start justify-center items-center'>
              <Link href="#" className="button-blur ">
                Explore Activities <MoveUpRight />
              </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
