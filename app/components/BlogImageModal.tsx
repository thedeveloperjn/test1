"use client";

import { useEffect, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";

export default function BlogImageModal({ imageUrl }: { imageUrl: string }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensure the root element exists before calling setAppElement
      const rootElement = document.getElementById("__next");
      if (rootElement) {
        Modal.setAppElement(rootElement);
        setIsMounted(true); // Set mounted state after ensuring root exists
      }
    }
  }, []);

  if (!isMounted) return null; // Prevent rendering before mounting

  return (
    <>
      <div className="single-image-container mt-4">
        <button onClick={() => setIsOpen(true)}>
          <Image
            src={imageUrl}
            alt="Blog Image"
            width={800}
            height={500}
            className="rounded-lg w-full object-cover min-h-[400px"
          />
        </button>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center p-4 bg-black/80"
        overlayClassName="fixed inset-0 bg-black/80"
      >
        <div className="relative max-w-3xl w-full">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-white text-2xl font-bold"
          >
            ×
          </button>
          <Image
            src={imageUrl}
            alt="Enlarged Blog Image"
            width={800}
            height={500}
            className="rounded-lg w-full min-h-[400px]"
          />
        </div>
      </Modal>
    </>
  );
}
