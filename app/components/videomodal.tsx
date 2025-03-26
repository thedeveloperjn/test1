"use client";

import React, { useState, useEffect ,useRef } from "react";

const VideoModal = ({ videoId, videoUrl, isOpen, onClose }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoId && !videoUrl) {
      setError("No video available");
    } else {
      setError(null);
    }
  }, [videoId, videoUrl]);

  useEffect(() => {
    // Reset mute state when modal opens
    if (isOpen) {
      setIsMuted(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-[1000]">
      <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center">
        {error ? (
          <div className="text-white text-center p-8">
            <p className="text-2xl mb-4">Video unavailable</p>
            <p>{error}</p>
          </div>
        ) : videoId ? (
          // YouTube Player
          <>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&showinfo=0&modestbranding=1&mute=${isMuted ? 1 : 0}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              frameBorder="0"
            ></iframe>
            <button
              className="absolute top-4 right-4 bg-white text-black p-2 rounded-full"
              onClick={onClose}
            >
              ✕
            </button>
            <button
              className="absolute top-4 left-4 bg-white text-black px-4 py-2 rounded-md"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? "Unmute" : "Mute"}
            </button>
          </>
        ) : (
          // Local Video Player
          <>
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              src={videoUrl}
              controls
              autoPlay
              muted={isMuted}
              onError={() => setError("Failed to load video")}
            />
            <button
              className="absolute top-4 right-4 bg-white text-black p-2 rounded-full"
              onClick={onClose}
            >
              ✕
            </button>
            <button
              className="absolute top-4 left-4 bg-white text-black px-4 py-2 rounded-md"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? "Unmute" : "Mute"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoModal;