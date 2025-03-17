'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function DocumentaryHeader() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => console.error('Video playback failed:', error));
    }
  }, []);

  return (
    <section className="bg-black relative h-screen pb-5 m-2" style={{ height: "calc(100vh - 85px)" }}>
      <div className="wrapper wrapper--wide relative h-full">
        <div className="relative flex h-full translate-x-0 items-end overflow-hidden rounded-2xl bg-black">
          <video
            ref={videoRef}
            loop
            playsInline
            autoPlay
            muted
            className="absolute inset-0 h-full w-full bg-black object-cover"
            src="https://cdnsnty.tonyrobbins.com/2024-04-30T18-51-24.269Z-Doc_Hero_SizzleTeaser.mp4"
          ></video>
          <div
            className="absolute inset-x-0 bottom-0 top-1/3"
            style={{ background: 'linear-gradient(transparent 50%, rgb(35, 35, 35) 100%)' }}
          ></div>
          <div className="absolute bottom-0 flex w-full p-5 md:p-10">
            <div className="flex w-full max-w-lg flex-col items-start space-y-10 lg:max-w-2xl">
              <h1 className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-contrast"></span>
                <span className="font-mono text-xs uppercase">Documentary</span>
              </h1>
              <div className="w-full max-w-lg">
                <Image
                  alt="Documentary Logo"
                  width={482}
                  height={196}
                  className="object-fit h-full w-full"
                  src="https://cdn.sanity.io/images/nyyhaljw/production/c5af2742e316a8e3e8c65ac93ec89fda01a01f37-482x196.svg?w=482&h=196&q=80&auto=format&w=1080"
                />
              </div>
              <button
                className="cursor-pointer group inline-flex items-center justify-center gap-2 font-medium text-center tracking-wide rounded-full duration-500 border border-contrast bg-contrast hover:bg-contrast-2 text-primary w-auto text-xs md:text-sm py-3 md:py-4 px-6 md:px-8 relative z-10"
              >
                <svg viewBox="0 0 24 24" fill="transparent" className="flex h-6 w-6 fill-current">
                  <title>Play</title>
                  <path d="M17.2335 11.1362C17.895 11.5221 17.895 12.4779 17.2335 12.8638L6.50387 19.1227C5.83721 19.5116 5 19.0308 5 18.259V5.74104C5 4.96925 5.83721 4.48838 6.50387 4.87726L17.2335 11.1362Z"></path>
                </svg>
                <span>Watch Trailer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
