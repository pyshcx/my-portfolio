"use client";

import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Experiences = () => {
  const scrollRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  
  // Auto-scroll functionality
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollInterval;
    
    // Start auto-scrolling when component mounts and not manually scrolling
    if (scrollContainer && !isHovering && autoScrollEnabled) {
      scrollInterval = setInterval(() => {
        // If we've reached the end, reset to beginning
        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
          scrollContainer.scrollLeft = 0;
        } else {
          // Otherwise, continue scrolling
          scrollContainer.scrollLeft += 2;
        }
      }, 30);
    }
    
    // Clean up interval on unmount or when hovering
    return () => {
      if (scrollInterval) {
        clearInterval(scrollInterval);
      }
    };
  }, [isHovering, autoScrollEnabled]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      // Temporarily disable auto-scroll when manually scrolling
      setAutoScrollEnabled(false);
      
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -400 : 400;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      // Re-enable auto-scroll after manual scroll completes
      setTimeout(() => setAutoScrollEnabled(true), 1000);
    }
  };

  const experiences = [
    {
      title: "Path Planning Head - Team Ojas Racing",
      date: "Mar 2023 - Present",
      points: [
        "Developed a path planning algorithm using Delaunay Triangulation for autonomous navigation.",
        "Implemented YOLO for real-time object detection, improving obstacle avoidance.",
      ],
    },
    {
      title: "Researcher - ARC (Autonomous Research Center), VIT",
      date: "Jan 2024 - Present",
      points: [
        "Working on a self-driving car project, focusing on autonomous navigation.",
        "Currently developing applications using ROS2 for real-time control.",
      ],
    },
    {
      title: "AI/ML Intern - MedAI Technologies",
      date: "Sep 2024 - Nov 2024",
      points: [
        "Integrated computer vision technology into a kiosk system.",
        "Conducted research on AI/ML models for medical diagnostics.",
      ],
    },
  ];

  return (
    <section
      id="experience"
      className="py-16 bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/images/lidar-bg.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      
      <div className="relative z-10 container mx-auto px-6">
        <h2 className="text-4xl font-bold text-lidar-teal text-center mb-12">Experience</h2>
        
        <div className="relative">
          <div 
            className="flex overflow-x-auto scrollbar-hide gap-6 pb-4 relative"
            ref={scrollRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollBehavior: 'smooth'
            }}
          >
            {experiences.map((experience, index) => (
              <div
                key={index}
                className="bg-lidar-black bg-opacity-70 p-6 rounded-lg shadow-lg min-w-[300px] md:min-w-[400px] flex-shrink-0 hover:scale-[1.02] transform transition duration-300"
              >
                <h3 className="text-xl font-semibold text-lidar-teal mb-2">
                  {experience.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4">{experience.date}</p>
                <ul className="list-disc ml-5 space-y-2 text-gray-300">
                  {experience.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
            
            {/* Duplicate cards for infinite scrolling effect */}
            {experiences.map((experience, index) => (
              <div
                key={`duplicate-${index}`}
                className="bg-lidar-black bg-opacity-70 p-6 rounded-lg shadow-lg min-w-[300px] md:min-w-[400px] flex-shrink-0 hover:scale-[1.02] transform transition duration-300"
              >
                <h3 className="text-xl font-semibold text-lidar-teal mb-2">
                  {experience.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4">{experience.date}</p>
                <ul className="list-disc ml-5 space-y-2 text-gray-300">
                  {experience.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* Subtle gradient overlay instead of dark corners */}
          <div className="absolute inset-y-0 left-0 w-20 pointer-events-none" style={{
            background: "linear-gradient(to right, rgba(12,12,12,0.8) 0%, rgba(12,12,12,0) 100%)"
          }}></div>
          
          <div className="absolute inset-y-0 right-0 w-20 pointer-events-none" style={{
            background: "linear-gradient(to left, rgba(12,12,12,0.8) 0%, rgba(12,12,12,0) 100%)"
          }}></div>
          
          <button 
            onClick={() => scroll('left')} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-lidar-black bg-opacity-70 p-3 rounded-full z-20 hover:bg-lidar-teal hover:text-black transition cursor-pointer"
          >
            <FaChevronLeft className="text-lidar-teal hover:text-black" />
          </button>
          
          <button 
            onClick={() => scroll('right')} 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-lidar-black bg-opacity-70 p-3 rounded-full z-20 hover:bg-lidar-teal hover:text-black transition cursor-pointer"
          >
            <FaChevronRight className="text-lidar-teal hover:text-black" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Experiences;
