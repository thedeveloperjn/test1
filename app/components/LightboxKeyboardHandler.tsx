"use client"; 

import { useEffect } from "react";

export default function LightboxKeyboardHandler({ totalImages }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const lightbox = document.querySelector(".lightbox:target");
      if (!lightbox) return;

      const currentIndex = parseInt(lightbox.id.split("-")[1]);

      if (e.key === "ArrowLeft") {
        const prevIndex = (currentIndex - 1 + totalImages) % totalImages;
        window.location.href = `#lightbox-${prevIndex}`;
      } else if (e.key === "ArrowRight") {
        const nextIndex = (currentIndex + 1) % totalImages;
        window.location.href = `#lightbox-${nextIndex}`;
      } else if (e.key === "Escape") {
        window.location.href = "#";
      }
    };

    document.addEventListener("keydown", handleKeyDown);

   
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [totalImages]);

  return null; 
}