import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import jQuery and Lightbox2 on the client side
const Lightbox = dynamic(() => import('lightbox2'), { ssr: false });

const LightboxComponent: React.FC = () => {
  useEffect(() => {
    // Import jQuery and Lightbox2 dynamically
    Promise.all([
      import('jquery'),
      import('lightbox2/dist/js/lightbox.min.js'),
      import('lightbox2/dist/css/lightbox.min.css'),
    ]).then(([jQuery]) => {
      // Ensure jQuery is available globally for Lightbox2
      window.jQuery = window.$ = jQuery.default;

      // Initialize Lightbox2
      if (window.Lightbox) {
        window.Lightbox.init();
      }
    });
  }, []);

  return null; // This component doesn't render anything, it just loads the scripts
};

export default LightboxComponent;