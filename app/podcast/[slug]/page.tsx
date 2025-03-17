'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { Play, Pause,X, RotateCcw, RotateCw } from 'lucide-react';

const podcast = {
  title: 'Watch Your Language!',
  imageSrc: 'https://cdn.sanity.io/images/nyyhaljw/production/b15b75468ad3b0e867bb29a2e486f38bbf8aa0b3-1080x1080.png?w=256&h=256&q=80&auto=format&w=384',
  audioSrc: 'https://cdnsnty.tonyrobbins.com/2024-06-07T20-20-08.238Z-Watch_Your_Language_The_Power_of_Spoken_Word.mp3',
  duration: 3485, // Total duration in seconds (58:05)
  date: 'JAN 14, 2024',
  category: 'RELATIONSHIPS, MINDSET',
};

const PodcastPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showBottomBar, setShowBottomBar] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(podcast.audioSrc);
    }

    const audio = audioRef.current;

    const updateTime = () => setCurrentTime(audio.currentTime);
    audio.addEventListener('timeupdate', updateTime);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => console.log('Playback error:', error));
    }

    setIsPlaying(!isPlaying);
    setShowBottomBar(true);
  };

  const closeBottomBar = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setShowBottomBar(false);
  };

  const handleProgressClick = (e, progressRef) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = progressRef.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newTime = (offsetX / rect.width) * podcast.duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 30, podcast.duration);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 30, 0);
    }
  };


  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="flex flex-col items-center m-5 rounded-[12px] bg-[#181818] text-white min-h-screen p-6 py-20">
      <div className="max-w-lg text-center">
        <Image
          src={podcast.imageSrc}
          alt={podcast.title}
          width={300}
          height={300}
          className="rounded-lg mx-auto mb-4"
          unoptimized
        />
        <p className="text-gray-400 text-sm">{podcast.category} • {podcast.date}</p>
        <h2 className="text-3xl font-bold mt-2">{podcast.title}</h2>

        {/* Main Progress Bar */}
        <div
          className="w-full bg-gray-700 h-1 rounded-full mt-4 relative cursor-pointer"
          onClick={(e) => handleProgressClick(e, e.currentTarget)}
        >
          <div
            className="bg-blue-500 h-1 rounded-full absolute top-0 left-0"
            style={{ width: `${(currentTime / podcast.duration) * 100}%` }}
          />
        </div>

        <div className="flex justify-between text-gray-400 text-sm mt-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(podcast.duration)}</span>
        </div>

        <div className="flex justify-center items-center mt-6 gap-6">
          <button onClick={skipBackward} className="relative flex items-center justify-center text-gray-400 hover:text-white">
            <RotateCcw size={40} />
            <span className="absolute text-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">30</span>
          </button>

          <button
            onClick={togglePlay}
            className="bg-white text-black p-6 rounded-full flex items-center justify-center"
          >
            {isPlaying ? <Pause size={32} /> : <Play size={32} />}
          </button>

          <button onClick={skipForward} className="relative flex items-center justify-center text-gray-400 hover:text-white">
            <RotateCw size={40} />
            <span className="absolute text-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">30</span>
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      {showBottomBar && (
        <div className='fixed bottom-0 left-0 w-full bg-black z-[99] flex flex-col'>
          {/* Bottom Bar Progress Bar */}
          <div
            className="w-full bg-gray-700 h-1 z-[99] rounded-full relative cursor-pointer"
            onClick={(e) => handleProgressClick(e, e.currentTarget)}
          >
            <div
              className="bg-blue-500 h-1 rounded-full absolute top-0 left-0"
              style={{ width: `${(currentTime / podcast.duration) * 100}%` }}
            />
          </div>

          <div className="relative text-white flex items-center justify-between p-4">
            <div className='flex items-center'>
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
           <div className='absolute left-[49%] flex'>
           

           <button
            onClick={togglePlay}
            className="bg-white text-black p-2 rounded-full flex items-center justify-center"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
            
</div>
<div className='flex items-center gap-[10px]'>
<div className="flex justify-between text-white font-semibold text-lg gap-[3px] mt-2">
          <span>{formatTime(currentTime)}</span><span> / </span> 
          <span>{formatTime(podcast.duration)}</span>
        </div>
<button onClick={skipBackward} className="relative flex items-center justify-center text-gray-400 hover:text-white">
            <RotateCcw size={30} />
            <span className="absolute text-[8px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">30</span>
          </button>
          <button onClick={skipForward} className="relative flex items-center justify-center text-gray-400 hover:text-white">
            <RotateCw size={30} />
            <span className="absolute text-[8px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">30</span>
          </button>
            <button onClick={closeBottomBar} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PodcastPage;
