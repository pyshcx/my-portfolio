"use client";

import { useRef, useState, useEffect } from "react";
import { FaGithub, FaCode } from "react-icons/fa";
import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const projects = [
    {
      title: "Hand Tracking Volume Controller",
      description:
        "Developed a real-time hand tracking system using Python and OpenCV.",
      githubLink: "https://github.com/pyshcx/volumetracking",
    },
    {
      title: "Automated News Summarization",
      description:
        "Built an automated system to fetch, summarize, and tweet AI/ML news.",
      githubLink: "https://github.com/pyshcx/ai-news-tweet-bot",
    },
    {
      title: "Delaunay Triangulation",
      description:
        "Developed a path planning algorithm using Delaunay Triangulation for autonomous navigation.",
      githubLink: "https://github.com/pyshcx/DelaunyTriangulation",
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

  // Handle touch events for swiping
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      if (activeIndex < projects.length - 1) {
        setActiveIndex(activeIndex + 1);
      }
    }
    
    if (touchStart - touchEnd < -50) {
      // Swipe right
      if (activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      }
    }
  };

  // Handle dot navigation
  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <SectionWrapper id="projects">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-4xl font-bold text-[#333333] text-center mb-12">Projects</h2>
        
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
                {projects.map((project, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <motion.div
                      className="bg-white bg-opacity-5 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-[#00BFA6]/10 h-[320px] flex flex-col"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div>
                        <div className="flex items-center mb-4">
                          <div className="bg-[#00BFA6] bg-opacity-10 p-2 rounded-full mr-3">
                            <FaCode className="text-[#00BFA6] text-xl" />
                          </div>
                          <h3 className="text-xl font-semibold text-[#333333]">
                            {project.title}
                          </h3>
                        </div>
                        <p className="text-[#333333] mb-6">{project.description}</p>
                      </div>
                      <motion.a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#00BFA6] text-white py-2 px-4 rounded-lg hover:bg-[#82E9F5] hover:text-[#333333] transition-all duration-300 flex items-center justify-center mt-auto"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaGithub className="mr-2" /> View on GitHub
                      </motion.a>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Dots for navigation */}
            <div className="flex justify-center mt-6 space-x-2">
              {projects.map((_, index) => (
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="bg-white bg-opacity-5 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-[#00BFA6]/10 h-[280px] flex flex-col justify-between"
                whileHover={{ 
                  scale: 1.03, 
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderColor: "rgba(0, 191, 166, 0.3)"
                }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <div className="flex items-center mb-4">
                    <div className="bg-[#00BFA6] bg-opacity-10 p-2 rounded-full mr-3">
                      <FaCode className="text-[#00BFA6] text-xl" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#333333]">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-[#333333] mb-6">{project.description}</p>
                </div>
                <motion.a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#00BFA6] text-white py-2 px-4 rounded-lg hover:bg-[#82E9F5] hover:text-[#333333] transition-all duration-300 flex items-center justify-center mt-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub className="mr-2" /> View on GitHub
                </motion.a>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </SectionWrapper>
  );
};

export default Projects;
