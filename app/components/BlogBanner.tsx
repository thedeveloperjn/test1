"use client"; // Ensure this runs on the client side
import { div } from "framer-motion/client";
import { Image_url } from "../config/constants";
import React, { useMemo } from "react";

const BlogBanner = ({ banner, title }: { banner: any; title: string }) => {
  // Function to convert a YouTube URL into an embeddable URL
  const convertToEmbedUrl = (url: string) => {
    let videoId = "";
    if (url.includes("youtu.be")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("youtube.com/watch")) {
      videoId = url.split("v=")[1]?.split("&")[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  };

  // Memoize video embed URL
  const embedUrl = useMemo(() => (banner?.bannerType === "VIDEO" ? convertToEmbedUrl(banner.video) : ""), [
    banner?.bannerType,
    banner?.video,
  ]);

  return (
    <div className="w-full max-w-[100%] max-h-[100%] mx-auto">
        {banner?.bannerType === "VIDEO" && embedUrl ? (
          <iframe
            className="w-full aspect-video rounded-xl"
            src={embedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ) : banner?.bannerType === "IMAGE" && banner?.image ? (
          <img
            className="w-full h-auto object-cover rounded-xl"
            src={`${Image_url}${banner.image}`}
            alt={title}
          />
        ) : null}
    </div>
  );
};

export default BlogBanner;
