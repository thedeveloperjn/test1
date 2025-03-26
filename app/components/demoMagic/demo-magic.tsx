"use client";

import Image from "next/image";
import React, { useState } from "react";

interface CursorBoxOverlayProps {
  imageWidth?: number; // Image width in pixels
  imageHeight?: number; // Image height in pixels
  hoverBoxRatio?: number; // Ratio of hover box size to image size (e.g., 0.25 for 25%)
  zoomScale?: number; // Scale for magnification
  imageUrl: string;
}

const MagicZoom: React.FC<CursorBoxOverlayProps> = ({
  imageWidth = 378,
  imageHeight = 378,
  hoverBoxRatio = 0.25, // Hover box is 25% of image size by default
  zoomScale = 4,
  imageUrl,
}) => {
  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // Calculate hover box dimensions based on the ratio
  const boxWidth = imageWidth * hoverBoxRatio;
  const boxHeight = imageHeight * hoverBoxRatio;

  const halfBoxWidth = boxWidth / 2;
  const halfBoxHeight = boxHeight / 2;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // Cursor x relative to the image
    const y = e.clientY - rect.top; // Cursor y relative to the image
    setCursorPosition({ x, y });
  };

  const calculateBackgroundPosition = () => {
    if (!cursorPosition) return "0 0";

    const bgX = Math.min(
      Math.max(cursorPosition.x - halfBoxWidth, 0),
      imageWidth - boxWidth
    );
    const bgY = Math.min(
      Math.max(cursorPosition.y - halfBoxHeight, 0),
      imageHeight - boxHeight
    );

    return `-${bgX * zoomScale}px -${bgY * zoomScale}px`;
  };

  return (
    <div className="flex w-full ">
      {/* Image with hover box */}
      <div
        className={`relative mx-auto`}
        style={{ width: "100%", height: `372px` }}
        // style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setCursorPosition(null)} // Reset on leave
      >
        {/* Image */}
        <Image
          placeholder="blur"
          blurDataURL="/images/productImage.svg"
          src={imageUrl}
          alt="Example"
          layout="fill"
          objectFit="cover"
          priority
        />

        {/* Hover Box */}
        {cursorPosition && (
          <div
            className="absolute border-2 border-white pointer-events-none"
            style={{
              width: `${boxWidth}px`,
              height: `${boxHeight}px`,
              top: `${Math.min(
                Math.max(cursorPosition.y - halfBoxHeight, 0),
                imageHeight - boxHeight
              )}px`,
              left: `${Math.min(
                Math.max(cursorPosition.x - halfBoxWidth, 0),
                imageWidth - boxWidth - 20
              )}px`,
            }}
          />
        )}
      </div>

      {/* Magnified selected portion */}
      {cursorPosition && (
        <div
          className="absolute overflow-hidden right-20 z-10"
          style={{
            width: `${boxWidth * 4}px`, // Adjust the size of the magnified view
            height: `${boxHeight * 4}px`,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: `${imageWidth * zoomScale}px ${
              imageHeight * zoomScale
            }px`,
            backgroundPosition: calculateBackgroundPosition(),
            backgroundRepeat: "no-repeat",
          }}
        />
      )}
    </div>
  );
};

export default MagicZoom;
