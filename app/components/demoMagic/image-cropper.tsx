// components/ImageCropper.tsx

import React from "react";
import Image from "next/image";

interface ImageCropperProps {
  imageUrl: string;
  width: number; // Width of the crop box
  height: number; // Height of the crop box
  xPos: number; // X position for the crop (from left)
  yPos: number; // Y position for the crop (from top)
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  imageUrl,
  width,
  height,
  xPos,
  yPos,
}) => {
  return (
    <div
      className="border"
      style={{
        position: "relative",
        width: `${width}px`,
        height: `${height}px`,
        overflow: "hidden",
      }}
    >
      <Image
        src={imageUrl}
        alt="Cropped"
        layout="intrinsic" // Ensures the image maintains its aspect ratio
        width={1000} // You can adjust the width as per your image dimensions
        height={1000} // You can adjust the height as per your image dimensions
        style={{
          position: "absolute",
          top: `-${yPos}px`,
          left: `-${xPos}px`,
        }}
      />
    </div>
  );
};

export default ImageCropper;
