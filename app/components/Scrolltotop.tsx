"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function ScrollToTop() {
  const pathname = usePathname(); // Get the current route

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when pathname changes
  }, [pathname]);

  return null;
}

export default ScrollToTop;
