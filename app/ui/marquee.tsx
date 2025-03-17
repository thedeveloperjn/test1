"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  className?: string;
  speed?: number;
  pauseOnHover?: boolean;
  children: React.ReactNode;
}

export function Marquee({
  className,
  speed = 50,
  pauseOnHover = true,
  children,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const animationDuration = containerRef.current.offsetWidth / speed;
    containerRef.current.style.setProperty(
      "--marquee-duration",
      `${animationDuration}s`
    );
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={cn("group relative overflow-hidden", className)}
    >
      <div className="flex whitespace-nowrap w-full">
        <div
          className={cn(
            "animate-marquee flex-shrink-0",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
        >
          {children}
        </div>
        {/* <div
          aria-hidden="true"
          className={cn(
            "animate-marquee flex-shrink-0",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
        >
          {children}
        </div> */}
      </div>
    </div>
  );
}
