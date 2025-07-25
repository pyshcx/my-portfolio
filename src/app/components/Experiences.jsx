"use client";

import { useState, useEffect, useRef } from "react";
import { FaBriefcase } from "react-icons/fa";
import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';

const Experiences = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  
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
    {
      title: "Research Intern - Ahmedabad University",
      date: "May 2025 – July 2025",
      points: [
        "Developed a physics-based deep learning model for predicting heat transfer spatiotemporal fields from CFD data.",
        "Designed and trained an improved ConvLSTM2D network with custom physics-informed loss functions, achieving high accuracy and significant speedup over classical solvers.",
      ]
    },
    {
      title: "Summer Research Intern - IIIT Delhi",
      date: "May 2025 – July 2025",
      points: [
        "Worked on image and story generation with consistency using knowledge graphs.",
        "Developed methods for generating coherent visual and textual narratives by integrating structured knowledge representations.",
      ]
    },
  ];

  const slidesCount = experiences.length;
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

  // Get visible experiences (3 at once with wraparound)
  const getVisibleExperiences = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (activeIndex + i) % experiences.length;
      visible.push({ ...experiences[index], originalIndex: index });
    }
    return visible;
  };

  const visibleExperiences = getVisibleExperiences();

  return (
    <SectionWrapper id="experience">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-4xl font-bold text-[#333333] text-center mb-12">Experience</h2>

        {/* Carousel container */}
        <div className="relative max-w-6xl mx-auto px-4" ref={containerRef}>
          {/* Left arrow */}
          <button
            aria-label="Previous Experience"
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#00BFA6] bg-opacity-90 text-white shadow-lg hover:bg-[#00d3b8] transition focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
          >
            &#8592;
          </button>

          {/* Right arrow */}
          <button
            aria-label="Next Experience"
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#00BFA6] bg-opacity-90 text-white shadow-lg hover:bg-[#00d3b8] transition focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
          >
            &#8594;
          </button>

          {/* Experiences container - showing 3 at once */}
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
              {visibleExperiences.map((experience, index) => (
                <div
                  key={`${experience.originalIndex}-${activeIndex}`}
                  className="w-1/3 flex-shrink-0 px-4"
                >
                  <motion.div
                    className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-[#00BFA6]/10 h-[350px] flex flex-col"
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ 
                      scale: 1.02, 
                      backgroundColor: "rgba(255,255,255,0.15)",
                      borderColor: "rgba(0,191,166,0.3)"
                    }}
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
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots navigation */}
          <div className="flex justify-center mt-8 space-x-2">
            {experiences.map((_, index) => (
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

export default Experiences;
