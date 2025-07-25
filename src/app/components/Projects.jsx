"use client";

import { useState, useEffect, useRef } from "react";
import { FaGithub, FaCode } from "react-icons/fa";
import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  
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
    {
      title: "AI-powered customer feedback analysis for car rental services",
      description:
        "Analyzed customer feedback using AI techniques specifically for car rental service improvement.",
      githubLink: "https://github.com/pyshcx/car-rental-feedback-analyzer.git",
    },
  ];

  const slidesCount = projects.length;
  const maxIndex = slidesCount - 1;

  // Detect if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    let autoScrollInterval;
    if (!isPaused) {
      autoScrollInterval = setInterval(() => {
        setActiveIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
      }, 4000);
    }
    return () => autoScrollInterval && clearInterval(autoScrollInterval);
  }, [isPaused, maxIndex]);

  // Touch/swipe handlers (mobile touch only)
  const handleTouchStart = (e) => {
    setIsPaused(true);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    const touchDiff = touchStart - touchEnd;
    if (Math.abs(touchDiff) > 50) {
      if (touchDiff > 0) {
        setActiveIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
      } else {
        setActiveIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
      }
    }
    setTimeout(() => setIsPaused(false), 1000);
  };

  // Dot navigation
  const handleDotClick = (index) => {
    setIsPaused(true);
    setActiveIndex(index);
    setTimeout(() => setIsPaused(false), 1000);
  };

  // Arrow controls
  const prevSlide = () => {
    setActiveIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 1000);
  };

  const nextSlide = () => {
    setActiveIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 1000);
  };

  // Get visible projects (3 at once with wraparound)
  const getVisibleProjects = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (activeIndex + i) % projects.length;
      visible.push({ ...projects[index], originalIndex: index });
    }
    return visible;
  };

  const visibleProjects = getVisibleProjects();

  return (
    <SectionWrapper id="projects">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-4xl font-bold text-[#333333] text-center mb-12">Projects</h2>

        {/* Carousel container */}
        <div className="relative max-w-6xl mx-auto px-4" ref={containerRef}>
          {/* Left arrow */}
          <button
            aria-label="Previous Projects"
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#00BFA6] bg-opacity-90 text-white shadow-lg hover:bg-[#00d3b8] transition focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
          >
            &#8592;
          </button>

          {/* Right arrow */}
          <button
            aria-label="Next Projects"
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#00BFA6] bg-opacity-90 text-white shadow-lg hover:bg-[#00d3b8] transition focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
          >
            &#8594;
          </button>

          {/* Projects container - showing 3 at once */}
          <div
            className="overflow-hidden mx-16"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div
              className="flex"
              animate={{ x: 0 }}
              transition={{ 
                duration: 0.6, 
                ease: "easeInOut",
                type: "tween"
              }}
            >
              {visibleProjects.map((project, index) => (
                <div
                  key={`${project.originalIndex}-${activeIndex}`}
                  className="w-1/3 flex-shrink-0 px-4"
                >
                  <motion.div
                    className="bg-white bg-opacity-5 backdrop-blur-sm p-5 rounded-xl shadow-lg border border-[#00BFA6]/10 h-[300px] flex flex-col"
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ 
                      scale: 1.02, 
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderColor: "rgba(0, 191, 166, 0.3)"
                    }}
                  >
                    <div className="flex-grow">
                      <div className="flex items-center mb-3">
                        <div className="bg-[#00BFA6] bg-opacity-10 p-2 rounded-full mr-3">
                          <FaCode className="text-[#00BFA6] text-lg" />
                        </div>
                        <h3 className="text-lg font-semibold text-[#333333] leading-tight">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-[#333333] mb-4 text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <motion.a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#00BFA6] text-white py-2 px-4 rounded-lg hover:bg-[#82E9F5] hover:text-[#333333] transition-all duration-300 flex items-center justify-center text-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGithub className="mr-2" /> View on GitHub
                    </motion.a>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots navigation */}
          <div className="flex justify-center mt-8 space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index 
                    ? 'bg-[#00BFA6] scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
};

export default Projects;
