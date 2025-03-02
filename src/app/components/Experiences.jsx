"use client";

import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaBriefcase } from "react-icons/fa";
import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';

const Experiences = () => {
  const scrollRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  
  // Auto-scroll functionality
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollInterval;
    
    if (scrollContainer && !isHovering && autoScrollEnabled) {
      scrollInterval = setInterval(() => {
        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += 2;
        }
      }, 30);
    }
    
    return () => {
      if (scrollInterval) {
        clearInterval(scrollInterval);
      }
    };
  }, [isHovering, autoScrollEnabled]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      setAutoScrollEnabled(false);
      
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
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
      date: "Jan 2025 - Present",
      points: [
        "Working on a self-driving car project, focusing on autonomous navigation.",
        "Currently developing applications using ROS2 for real-time control.",
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

  return (
    <SectionWrapper id="experience">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-4xl font-bold text-[#333333] text-center mb-12">Experience</h2>
        
        <div className="bg-white bg-opacity-5 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-[#00BFA6]/10 shadow-xl mb-6">
          <div className="relative">
            <div 
              className="flex overflow-x-auto scrollbar-hide gap-4 md:gap-6 pb-4 relative"
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
                <motion.div
                  key={index}
                  className="bg-white bg-opacity-5 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-[#00BFA6]/10 min-w-[280px] sm:min-w-[320px] md:min-w-[400px] flex-shrink-0 transform transition duration-300"
                  whileHover={{ 
                    scale: 1.03, 
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderColor: "rgba(0, 191, 166, 0.3)"
                  }}
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-[#00BFA6] bg-opacity-10 p-2 rounded-full mr-3">
                      <FaBriefcase className="text-[#00BFA6] text-xl" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#333333]">
                      {experience.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#333333] mb-4 italic">{experience.date}</p>
                  <ul className="list-disc ml-5 space-y-2 text-[#333333]">
                    {experience.points.map((point, i) => (
                      <li key={i} className="text-base">{point}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
              
              {/* Duplicate cards for infinite scrolling effect */}
              {experiences.map((experience, index) => (
                <motion.div
                  key={`duplicate-${index}`}
                  className="bg-white bg-opacity-5 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-[#00BFA6]/10 min-w-[280px] sm:min-w-[320px] md:min-w-[400px] flex-shrink-0 transform transition duration-300"
                  whileHover={{ 
                    scale: 1.03, 
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderColor: "rgba(0, 191, 166, 0.3)"
                  }}
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-[#00BFA6] bg-opacity-10 p-2 rounded-full mr-3">
                      <FaBriefcase className="text-[#00BFA6] text-xl" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#333333]">
                      {experience.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#333333] mb-4 italic">{experience.date}</p>
                  <ul className="list-disc ml-5 space-y-2 text-[#333333]">
                    {experience.points.map((point, i) => (
                      <li key={i} className="text-base">{point}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
            
            {/* Subtle gradient overlay */}
            <div className="absolute inset-y-0 left-0 w-12 md:w-20 pointer-events-none" style={{
              background: "linear-gradient(to right, rgba(30,61,88,0.9) 0%, rgba(30,61,88,0) 100%)"
            }}></div>
            
            <div className="absolute inset-y-0 right-0 w-12 md:w-20 pointer-events-none" style={{
              background: "linear-gradient(to left, rgba(30,61,88,0.9) 0%, rgba(30,61,88,0) 100%)"
            }}></div>
            
            <motion.button 
              onClick={() => scroll('left')} 
              className="absolute left-1 md:left-4 top-1/2 transform -translate-y-1/2 bg-[#00BFA6] p-2 md:p-3 rounded-full z-20 hover:bg-[#82E9F5] transition cursor-pointer shadow-lg"
              aria-label="Scroll left"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaChevronLeft className="text-[#1E3D58]" />
            </motion.button>
            
            <motion.button 
              onClick={() => scroll('right')} 
              className="absolute right-1 md:right-4 top-1/2 transform -translate-y-1/2 bg-[#00BFA6] p-2 md:p-3 rounded-full z-20 hover:bg-[#82E9F5] transition cursor-pointer shadow-lg"
              aria-label="Scroll right"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaChevronRight className="text-[#1E3D58]" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
};

export default Experiences;
