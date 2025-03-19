"use client";

import { useEffect, useState } from "react";
import { usePlayer } from "../../context/PlayerContext";
import { Play, Pause, RotateCcw, RotateCw } from "lucide-react";
import Image from "next/image";
import { fetchYouTubeVideo } from "../../utils/fetchYouTubeVideo"; // Import the utility function

const podcast = {
  title: "Watch Your Language!",
  imageSrc: "https://cdn.sanity.io/images/nyyhaljw/production/b15b75468ad3b0e867bb29a2e486f38bbf8aa0b3-1080x1080.png?w=256&h=256&q=80&auto=format&w=384",
  audioSrc: "https://cdnsnty.tonyrobbins.com/2024-06-07T20-20-08.238Z-Watch_Your_Language_The_Power_of_Spoken_Word.mp3",
  duration: 3485, // Total duration in seconds (58:05)
  date: "JAN 14, 2024",
  category: "RELATIONSHIPS, MINDSET",
};

const PodcastPage = () => {
  const {
    isPlaying,
    currentTime,
    togglePlay,
    handleProgressClick,
    skipForward,
    skipBackward,
    formatTime,
    setPodcast,
  } = usePlayer();

  const [videoDetails, setVideoDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const videoId = "dQw4w9WgXcQ"; // Replace with the actual YouTube video ID
  const apiKey = "AIzaSyAEu_RvHypE0ZhNp8Oqr-LuLgsFo1Dpnww"; // Your YouTube API key

  // Fetch YouTube video details
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const details = await fetchYouTubeVideo(videoId, apiKey);
        setVideoDetails(details);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId, apiKey]);

  // Set the podcast in the player context
  useEffect(() => {
    setPodcast(podcast);
  }, [setPodcast]);

  if (loading) {
    return <div className="text-white text-center"></div>;
  }

  if (error) {
    return <div className="text-white text-center">Error: {error}</div>;
  }

  return (
    <div className="flex  items-center bg-white text-white min-h-screen p-2 xl:p-6 xl:py-20">
      <div className="xl:flex  max-w-[1150px] m-auto xl:justify-between justify-center ">
      <div className="xl:w-[40%]  text-center xl:sticky self-start top-[65px]">
        <div className="rounded-[12px] bg-[#181818] p-8">
        {/* Podcast Image */}
        <Image
          src={podcast.imageSrc}
          alt={podcast.title}
          width={400}
          height={400}
          className="rounded-lg mx-auto mb-4"
          unoptimized
        />
         <p className="text-[#ffffff66] block xl:hidden text-sm">
          {podcast.category} • {podcast.date}
        </p>
        <h2 className="text-[30px] block xl:hidden md:text-[32px] text-white  mt-2  font-semibold -tracking-[0.02em] text-center pb-2 font-movatif leading-[40px] md:leading-[40px]">{podcast.title}</h2>

         <p className="text-[#ffffff66] font-movatif  hidden xl:block text-md">{podcast.title}</p>
        {/* Main Progress Bar */}
        <div
          className="w-full bg-gray-700 h-1 rounded-full mt-4 relative cursor-pointer"
          onClick={handleProgressClick}
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

          <button onClick={togglePlay} className="bg-white text-black p-6 rounded-full flex items-center justify-center">
            {isPlaying ? <Pause size={32} /> : <Play size={32} />}
          </button>

          <button onClick={skipForward} className="relative flex items-center justify-center text-gray-400 hover:text-white">
            <RotateCw size={40} />
            <span className="absolute text-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">30</span>
          </button>
        </div>
        </div>
      </div>
      <div className="xl:w-[54%] ">
      <p className="text-[#00000099] font-ibmflexmono font-[600] text-sm mt-5 hidden xl:block ">
          {podcast.category} • {podcast.date}
        </p>
        <h2 className="text-[30px] text-black hidden xl:block md:text-[70px] font-semibold font-movatif font-[100] mt-2 mb-4 -tracking-[0.02em]  pb-2 leading-[40px] md:leading-[70px]">{podcast.title}</h2>

        {/* YouTube Video Embed */}
        {videoDetails && (
          <div className="">
            <iframe
              width="576"
              height="380"
              src={`https://www.youtube.com/embed/uAzYOs5357A`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full mt-2 xl:mt-0 aspect-video rounded-lg"
            ></iframe>
            {/* <h3 className="text-[30px] md:text-[32px] text-white font-[100] mt-4 -tracking-[0.01em] text-center pb-14 font-movatif leading-[40px] md:leading-[40px]">{videoDetails.title}</h3> */}
            <p
  className="text-[#00000099] mt-4 px-2 text-[15px] leading-[28px] -tracking-[0.03em] font-ibmplexmono md:leading-[36px] pb-8 xl:pb-0 md:text-[18px]"
  dangerouslySetInnerHTML={{
    __html: videoDetails.description
      .trim()
      .split("\n")
      .filter((line) => line.trim() !== "") // Remove empty lines
      .join("<br/>") 
  }}
/>






          </div>
        )}

      </div></div>
    </div>
  );
};

export default PodcastPage;