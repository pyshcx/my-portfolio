"use client";

import { useRef, useState, useEffect } from "react";
import { FaGraduationCap, FaAward, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';

const Education = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef(null);
  
  // Education data
  const educations = [
    {
      degree: "B.Tech in Computer Science",
      institution: "Vellore Institute of Technology (VIT)",
      duration: "2022 - 2026",
      description: "Specializing in AI/ML and Computer Vision with a focus on autonomous systems.",
      achievements: [
        "CGPA: 8.63/10",
        "Member of Autonomous Research Center (ARC)",
        "Path Planning Lead of Team Ojas Racing",
      ],
    },
    {
      degree: "Higher Secondary Education",
      institution: "DAV International School",
      duration: "2020 - 2022",
      description: "Focused on Physics, Chemistry, Mathematics, and Computer Science.",
      achievements: ["Class 12th: 88%", "Class 10th: 94%"],
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
      if (activeIndex < educations.length - 1) {
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
    <SectionWrapper id="education">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-4xl font-bold text-[#333333] text-center mb-12">Education</h2>
        
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
                {educations.map((education, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <motion.div
                      className="bg-white bg-opacity-5 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-[#00BFA6]/10 min-h-[420px] flex flex-col"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center mb-4">
                        <div className="bg-[#00BFA6] bg-opacity-10 p-2 rounded-full mr-3">
                          <FaGraduationCap className="text-[#00BFA6] text-2xl" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-[#333333]">{education.degree}</h3>
                          <p className="text-[#333333] opacity-90">{education.institution}</p>
                        </div>
                      </div>
                      <div className="bg-[#00BFA6]/5 px-3 py-1 rounded-full inline-block mb-3">
                        <p className="text-sm text-[#333333] italic">{education.duration}</p>
                      </div>
                      <p className="text-[#333333] mb-4">{education.description}</p>
                      <div>
                        <h4 className="text-lg font-semibold text-[#333333] mb-2 flex items-center">
                          <FaAward className="text-[#00BFA6] mr-2 text-sm" />
                          Achievements:
                        </h4>
                        <ul className="list-disc ml-6 space-y-1 text-[#333333]">
                          {education.achievements.map((achievement, i) => (
                            <li key={i} className="text-base">{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Dots for navigation */}
            <div className="flex justify-center mt-6 space-x-2">
              {educations.map((_, index) => (
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
          <div className="bg-white bg-opacity-5 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-[#00BFA6]/10 shadow-xl mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {educations.map((education, index) => (
                <motion.div
                  key={index}
                  className="bg-white bg-opacity-5 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-[#00BFA6]/10 h-full flex flex-col"
                  whileHover={{ 
                    scale: 1.03, 
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderColor: "rgba(0, 191, 166, 0.3)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-[#00BFA6] bg-opacity-10 p-2 rounded-full mr-3">
                      <FaGraduationCap className="text-[#00BFA6] text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#333333]">{education.degree}</h3>
                      <p className="text-[#333333] opacity-90">{education.institution}</p>
                    </div>
                  </div>
                  <div className="bg-[#00BFA6]/5 px-3 py-1 rounded-full inline-block mb-3 w-fit">
                    <p className="text-sm text-[#333333] italic">{education.duration}</p>
                  </div>
                  <p className="text-[#333333] mb-4">{education.description}</p>
                  <div className="mt-auto">
                    <h4 className="text-lg font-semibold text-[#333333] mb-2 flex items-center">
                      <FaAward className="text-[#00BFA6] mr-2 text-sm" />
                      Achievements:
                    </h4>
                    <ul className="list-disc ml-6 space-y-1 text-[#333333]">
                      {education.achievements.map((achievement, i) => (
                        <li key={i} className="text-base">{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </SectionWrapper>
  );
};

export default Education;
