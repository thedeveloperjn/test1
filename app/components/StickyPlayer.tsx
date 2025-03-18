// components/StickyPlayer.tsx
"use client";

import { usePlayer } from "../context/PlayerContext";
import { Play, Pause, X, RotateCcw, RotateCw } from "lucide-react";
import Image from "next/image";

const StickyPlayer = () => {
  const {
    isPlaying,
    currentTime,
    showBottomBar,
    togglePlay,
    closeBottomBar,
    handleProgressClick,
    skipForward,
    skipBackward,
    formatTime,
    podcast,
  } = usePlayer();

  if (!podcast || !showBottomBar) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black z-[99] flex flex-col">
      {/* Bottom Bar Progress Bar */}
      <div
        className="w-full bg-gray-700 h-1 z-[99] rounded-full relative cursor-pointer"
        onClick={handleProgressClick}
      >
        <div
          className="bg-blue-500 h-1 rounded-full absolute top-0 left-0"
          style={{ width: `${(currentTime / podcast.duration) * 100}%` }}
        />
      </div>

      <div className="relative text-white flex items-center justify-between p-4">
        <div className="flex items-center">
          <Image
            src={podcast.imageSrc}
            alt={podcast.title}
            width={50}
            height={50}
            className="rounded-lg"
            unoptimized
          />
          <div className="flex-1 ml-4">
            <h3 className="text-sm">{podcast.title}</h3>
          </div>
        </div>
        <div className="absolute right-[35px] md:left-[49%] flex">
          <button
            onClick={togglePlay}
            className="md:bg-white md:text-black fill-white p-2 rounded-full flex items-center justify-center"
          >
            {isPlaying ? <Pause className="!fill-white md:fill-none" size={20} /> : <Play className="!fill-white md:fill-none" size={20} />}
          </button>
        </div>
        <div className="flex items-center gap-[10px]">
          <div className="hidden md:flex justify-between text-white font-semibold text-lg gap-[3px] mt-2">
            <span>{formatTime(currentTime)}</span>
            <span> / </span>
            <span>{formatTime(podcast.duration)}</span>
          </div>
          <button
            onClick={skipBackward}
            className="relative  hidden md:flex items-center justify-center text-gray-400 hover:text-white"
          >
            <RotateCcw size={30} />
            <span className="absolute text-[8px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">30</span>
          </button>
          <button
            onClick={skipForward}
            className="relative hidden md:flex items-center justify-center text-gray-400 hover:text-white"
          >
            <RotateCw size={30} />
            <span className="absolute text-[8px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">30</span>
          </button>
          <button onClick={closeBottomBar} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyPlayer;