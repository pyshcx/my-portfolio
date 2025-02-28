"use client";

import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaGraduationCap } from "react-icons/fa";

const Education = () => {
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

  const educations = [
    {
      degree: "B.Tech in Computer Science",
      institution: "Vellore Institute of Technology (VIT)",
      duration: "2022 - 2026",
      description: "Specializing in AI/ML and Computer Vision with a focus on autonomous systems.",
      achievements: [
        "CGPA: 8.63/10",
        "Member of Autonomous Research Center (ARC)",
        "Path Planning Lead of Team Ojas Racing"
      ]
    },
    {
      degree: "Higher Secondary Education",
      institution: "DAV International School",
      duration: "2020 - 2022",
      description: "Focused on Physics, Chemistry, and Mathematics with Computer Science.",
      achievements: [
        "Class 12th: 88%",
        "Class 10th: 94%"
      ]
    },
  ];

  return (
    <section
      id="education"
      className="py-16 bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/images/lidar-bg.jpg')",
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      
      <div className="relative z-10 container mx-auto px-6">
        <h2 className="text-4xl font-bold text-lidar-teal text-center mb-12">Education</h2>
        
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
            {educations.map((education, index) => (
              <div
                key={index}
                className="bg-lidar-black bg-opacity-70 p-6 rounded-lg shadow-lg min-w-[300px] md:min-w-[400px] flex-shrink-0 hover:scale-[1.02] transform transition duration-300"
              >
                <div className="flex items-center mb-3">
                  <FaGraduationCap className="text-lidar-teal text-2xl mr-3" />
                  <h3 className="text-xl font-semibold text-lidar-teal">
                    {education.degree}
                  </h3>
                </div>
                <p className="text-white font-medium mb-1">{education.institution}</p>
                <p className="text-sm text-gray-400 mb-3">{education.duration}</p>
                <p className="text-gray-300 mb-4">{education.description}</p>
                <div>
                  <h4 className="text-sm font-semibold text-lidar-teal mb-2">Achievements:</h4>
                  <ul className="list-disc ml-5 space-y-1 text-gray-300">
                    {education.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            
            {/* Duplicate cards for infinite scrolling effect */}
            {educations.map((education, index) => (
              <div
                key={`duplicate-${index}`}
                className="bg-lidar-black bg-opacity-70 p-6 rounded-lg shadow-lg min-w-[300px] md:min-w-[400px] flex-shrink-0 hover:scale-[1.02] transform transition duration-300"
              >
                <div className="flex items-center mb-3">
                  <FaGraduationCap className="text-lidar-teal text-2xl mr-3" />
                  <h3 className="text-xl font-semibold text-lidar-teal">
                    {education.degree}
                  </h3>
                </div>
                <p className="text-white font-medium mb-1">{education.institution}</p>
                <p className="text-sm text-gray-400 mb-3">{education.duration}</p>
                <p className="text-gray-300 mb-4">{education.description}</p>
                <div>
                  <h4 className="text-sm font-semibold text-lidar-teal mb-2">Achievements:</h4>
                  <ul className="list-disc ml-5 space-y-1 text-gray-300">
                    {education.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
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

export default Education;
