"use client";

import MagicZoom from "../../../components/demoMagic/demo-magic";
import { ImageGalleryProps } from "../../../interfaces/product/product";
import { useState } from "react";
import ReactPlayer from "react-player/lazy";
import { toast } from "react-toastify";
export function ImageGallery({
  videoLink,
  images,
}: {
  videoLink?: string;
  images: ImageGalleryProps;
}) {
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleError = () => {
    setVideoError(true);
    toast.info(
      "Embedding is disabled for this video. Please watch it on YouTube."
    );
  };
  const handleVideoReady = () => {
    setIsVideoReady(true); // Set the video as ready once it's loaded
  };
  return (
    <div className="grid grid-cols-2 lg:gap-5 gap-1 overflow-hidden">
      {images.values.map((image, idx) => (
        <MagicZoom key={idx} imageUrl={image.url} />
      ))}
      {videoLink && !videoError ? (
        <div className="relative overflow-hidden rounded-none">
          {!isVideoReady && (
            <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center bg-black z-30 animate-out"></div>
          )}

          <ReactPlayer
            url={videoLink}
            width="100%"
            height="100%"
            controls
            playing={isPlaying}
            muted
            loop
            style={{
              scale: "1.3",
              zIndex: 1,
            }}
            config={{
              youtube: {
                playerVars: {
                  disablekb: 1, // Disable keyboard controls
                  fs: 0, // Disable fullscreen button
                  iv_load_policy: 3, // Hide annotations
                  modestbranding: 1, // Remove YouTube logo
                  rel: 0, // Prevent showing related videos at the end
                  playsinline: 1, // Allow video to play inline on iOS
                  start: 5, // Start the video at 5 seconds
                },
              },
            }}
            onReady={handleVideoReady} // Hide placeholder when video is ready
            onStart={handleVideoReady} // Also hide placeholder when video starts
            onError={handleError}
          />

          {/* Overlay div for play/pause toggle */}
          <div
            id="overlay-div"
            className="absolute top-0 left-0 h-full w-full z-20 cursor-pointer"
            onClick={togglePlayPause}
          />
        </div>
      ) : null}
    </div>
  );
}
