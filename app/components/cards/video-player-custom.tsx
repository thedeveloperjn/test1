"use client";

import { useEffect, useRef, useState } from "react";
import VideoPlayerControls from "../ui/VideoPlayerControls";
import { cn } from "../../lib/utils";

interface VideoPlayerCustomProps {
  videoLink: string;
  showControlls?: boolean;
  classNameProps?: React.ComponentProps<"div">["className"];
}

export default function VideoPlayerCustom({
  videoLink,
  showControlls = false,
  classNameProps,
}: VideoPlayerCustomProps) {
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>();
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      setVideoDuration(video.duration);
    }
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const currentTime = videoRef.current?.currentTime;
    if (videoDuration != null && currentTime != null) {
      const loadingTimeout = setTimeout(() => {
        if (videoProgress == currentTime / videoDuration) {
          setVideoProgress((prev) => prev + 0.000001);
        } else {
          setVideoProgress(currentTime / videoDuration);
        }
      }, 10);

      return () => {
        clearTimeout(loadingTimeout);
      };
    }
  }, [videoProgress, videoDuration, isPaused]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      setIsPaused(!video.paused);
      video.paused ? video.play() : video.pause();
    }
  };

  return (
    <div
      className={cn(
        "relative w-full h-full lg:mx-auto overflow-hidden",
        classNameProps
      )}
    >
      {showControlls && (
        <div className="absolute lg:top-1/2 top-2 lg:right-1/2 right-3 z-10">
          <VideoPlayerControls
            progress={videoProgress}
            isPaused={isPaused}
            onPlayPause={togglePlayPause}
          />
        </div>
      )}
      <video
        className="w-full h-full object-cover"
        ref={videoRef}
        loop
        muted
        autoPlay
      >
        <source src={videoLink} />
      </video>
    </div>
  );
}
