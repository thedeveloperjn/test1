import "lightbox2/dist/css/lightbox.min.css"; // Import Lightbox2 CSS

// Import Lightbox dynamically to avoid server-side rendering issues
export const initializeLightbox = async () => {
  if (typeof window !== "undefined") {
    const lightbox = (await import("lightbox2")).default;

    lightbox.option({
      resizeDuration: 200,
      wrapAround: true,
      alwaysShowNavOnTouchDevices: true,
    });
  }
};
