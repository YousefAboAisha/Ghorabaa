"use client";
import React, { useState, useEffect, useRef } from "react";

type LeasingCardProps = {
  label: string;
  number: number;
  color: string;
};

const MartyrsStatisticCard = ({ label, number }: LeasingCardProps) => {
  const [animatedNumber, setAnimatedNumber] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start the animation when the component is in view
            animateNumber(0, number, 3000); // Adjust duration as needed
            observer.unobserve(entry.target); // Stop observing after animation starts
          }
        });
      },
      { threshold: 0.7 } // Trigger when 50% of the component is visible
    );

    const currentCardRef = cardRef.current;
    if (currentCardRef) {
      observer.observe(currentCardRef);
    }

    return () => {
      if (currentCardRef) {
        observer.unobserve(currentCardRef);
      }
    };
  }, [number]);

  const animateNumber = (start: number, end: number, duration: number) => {
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const increment = Math.min(
        (progress / duration) * (end - start),
        end - start
      );
      setAnimatedNumber(Math.floor(start + increment));

      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        setAnimatedNumber(end); // Ensure the final number is exact
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <div
      ref={cardRef}
      className={`relative flex flex-col items-center justify-center gap-6 p-6 py-10 border bg-white`}
    >
      <h2 className={`text-lg z-10 text-gray-600`}>{label}</h2>

      <div className="flex flex-row gap-2 z-10 items-center">
        <p className="text-5xl md:text-5xl lg:text-4xl font-extrabold">
          {animatedNumber.toLocaleString()}
        </p>
        <p className="text-4xl text-rejected font-bold">&#43;</p>
      </div>
    </div>
  );
};

export default MartyrsStatisticCard;
