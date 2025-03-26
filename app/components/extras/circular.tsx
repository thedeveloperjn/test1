"use client";
import { useEffect, useRef, useState } from "react";

export default function CircularText({ className = "" }) {
    const textRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [phase, setPhase] = useState("gradient");
    const text = "REST OF LIFE ✦ BEST OF LIFE ✦";
    const letters = text.split("");

    useEffect(() => {
        const textElement = textRef.current;
        let degree = 0;
        const animateText = () => {
            degree = (degree + 0.3) % 360;
            textElement.style.transform = `rotate(${degree}deg)`;
            requestAnimationFrame(animateText);
        };
        animateText();
    }, []);

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < letters.length) {
                setActiveIndex(index);
                index++;
            } else {
                setPhase((prev) => (prev === "gradient" ? "white" : "gradient"));
                index = 0; // Restart smoothly without blinking
            }
        }, 200); // Speed of transition

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`flex justify-center items-center   ${className}`}>
            <div ref={textRef} className="absolute">
                <svg width="140" height="140" viewBox="0 0 200 200" className="relative w-[90px] md:w-[140px] md:h-[140px] h-[90px]" >
                    <defs>
                        <path id="circlePath" d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" />
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#6D78EB" />
                            <stop offset="16%" stopColor="#53D5E8" />
                            <stop offset="76%" stopColor="#6A81EB" />
                            <stop offset="100%" stopColor="#794CEC" />
                        </linearGradient>
                    </defs>
                    <text fontSize="16" fontWeight="bold" letterSpacing="8">
                        <textPath xlinkHref="#circlePath" startOffset="50%" textAnchor="middle">
                            {letters.map((letter, index) => (
                                <tspan
                                    key={index}
                                    fill={index <= activeIndex
                                        ? phase === "gradient"
                                            ? "url(#gradient)"
                                            : "#fff"
                                        : phase === "gradient"
                                        ? "#fff"
                                        : "url(#gradient)"
                                    }
                                    className="transition-colors duration-100 ease-linear"
                                >
                                    {letter}
                                </tspan>
                            ))}
                        </textPath>
                    </text>
                </svg>
            </div>
        </div>
    );
}
