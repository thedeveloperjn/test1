import { useState, useEffect } from "react";

// Define the possible screen sizes
type ScreenSize = "mobile" | "tablet" | "desktop";

// Define the breakpoints (in pixels)
const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
};

export function useScreenSize(): ScreenSize {
  const [screenSize, setScreenSize] = useState<ScreenSize>("desktop");

  useEffect(() => {
    // Function to update the screen size
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < BREAKPOINTS.mobile) {
        setScreenSize("mobile");
      } else if (width < BREAKPOINTS.tablet) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    // Set the initial screen size
    updateScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", updateScreenSize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  return screenSize;
}
