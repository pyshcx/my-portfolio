"use client";

import { useRef, useState, useEffect } from "react";
import { FaBriefcase } from "react-icons/fa";
import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';

const Experiences = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
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
      title: "AI/ML Intern - MedAI Technologies",
      date: "Sep 2024 - Dec 2024",
      points: [
        "Integrated computer vision technology into a kiosk system.",
        "Conducted research on AI/ML models for medical diagnostics.",
      ],
    },
  ];

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    let autoScrollInterval;
    
    if (isMobile && !isPaused) {
      autoScrollInterval = setInterval(() => {
        setActiveIndex((prevIndex) => 
          prevIndex === experiences.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Change slide every 5 seconds
    }
    
    return () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
    };
  }, [isMobile, isPaused, experiences.length]);

  // Handle touch events for swiping
  const handleTouchStart = (e) => {
    setIsPaused(true); // Pause auto-scroll when user interacts
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      if (activeIndex < experiences.length - 1) {
        setActiveIndex(activeIndex + 1);
      }
    }
    
    if (touchStart - touchEnd < -50) {
      // Swipe right
      if (activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      }
    }
    
    // Resume auto-scroll after a delay
    setTimeout(() => setIsPaused(false), 5000);
  };

  // Handle dot navigation
  const handleDotClick = (index) => {
    setIsPaused(true);
    setActiveIndex(index);
    // Resume auto-scroll after a delay
    setTimeout(() => setIsPaused(false), 5000);
  };

  return (
    <SectionWrapper id="experience">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-4xl font-bold text-[#333333] text-center mb-8">Experience</h2>
        
        {/* Mobile Swipeable Cards */}
        {isMobile && (
          <div className="relative px-4">
            <div 
              className="overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {experiences.map((experience, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <motion.div
                      className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-[#00BFA6]/10 h-[350px] flex flex-col"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center mb-4">
                        <div className="bg-[#00BFA6] bg-opacity-10 p-2 rounded-full mr-3">
                          <FaBriefcase className="text-[#00BFA6] text-xl" />
                        </div>
                        <h3 className="text-lg font-semibold text-[#333333]">
                          {experience.title}
                        </h3>
                      </div>
                      <p className="text-sm text-[#333333] mb-4 italic">{experience.date}</p>
                      <ul className="list-disc ml-5 space-y-2 text-[#333333] flex-grow">
                        {experience.points.map((point, i) => (
                          <li key={i} className="text-sm">{point}</li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Dots for navigation */}
            <div className="flex justify-center mt-4 space-x-2">
              {experiences.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    activeIndex === index ? 'bg-[#00BFA6]' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Desktop Layout */}
        {!isMobile && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-[#00BFA6]/10 h-full flex flex-col"
                whileHover={{ 
                  scale: 1.03, 
                  backgroundColor: "rgba(255,255,255,0.15)",
                  borderColor: "rgba(0,191,166,0.3)"
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-[#00BFA6] bg-opacity-10 p-2 rounded-full mr-3">
                    <FaBriefcase className="text-[#00BFA6] text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#333333]">
                      {experience.title}
                    </h3>
                    <p className="text-sm text-[#333333] italic">{experience.date}</p>
                  </div>
                </div>
                <ul className="list-disc ml-5 space-y-2 text-[#333333] flex-grow">
                  {experience.points.map((point, i) => (
                    <li key={i} className="text-sm">{point}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </SectionWrapper>
  );
};

export default Experiences;
