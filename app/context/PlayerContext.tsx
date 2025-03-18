// context/PlayerContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode, useRef, useEffect } from "react";

type Podcast = {
  title: string;
  imageSrc: string;
  audioSrc: string;
  duration: number;
  date: string;
  category: string;
};

type PlayerContextType = {
  isPlaying: boolean;
  currentTime: number;
  showBottomBar: boolean;
  podcast: Podcast | null;
  togglePlay: () => void;
  closeBottomBar: () => void;
  handleProgressClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  skipForward: () => void;
  skipBackward: () => void;
  formatTime: (time: number) => string;
  setPodcast: (podcast: Podcast) => void;
};

const PlayerContext = createContext<PlayerContextType | null>(null);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showBottomBar, setShowBottomBar] = useState(false);
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current && podcast) {
      audioRef.current = new Audio(podcast.audioSrc);
    }

    const audio = audioRef.current;

    const updateTime = () => setCurrentTime(audio?.currentTime || 0);
    audio?.addEventListener("timeupdate", updateTime);

    return () => {
      audio?.removeEventListener("timeupdate", updateTime);
    };
  }, [podcast]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => console.log("Playback error:", error));
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

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !podcast) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newTime = (offsetX / rect.width) * podcast.duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const skipForward = () => {
    if (audioRef.current && podcast) {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 30, podcast.duration);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 30, 0);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        currentTime,
        showBottomBar,
        podcast,
        togglePlay,
        closeBottomBar,
        handleProgressClick,
        skipForward,
        skipBackward,
        formatTime,
        setPodcast,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};