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
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);

  // Education data
  const educations = [
    {
      degree: "B.Tech in Computer Science",
      institution: "Vellore Institute of Technology (VIT)",
      duration: "2022 - 2026",
      description: "Specializing in AI/ML and Computer Vision with a focus on autonomous systems.",
      achievements: [
        "CGPA: 8.72/10",
        "Member of Autonomous Research Center (ARC)",
        "Path Planning Lead of Team Ojas Racing",
      ],
    },
    {
      degree: "Higher Secondary Education",
      institution: "DAV International School",
      duration: "2008 - 2022",
      description: "Focused on Physics, Chemistry, Mathematics, Computer Science and Economics.",
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

  // Auto-scroll functionality
  useEffect(() => {
    let autoScrollInterval;

    if (isMobile && !isPaused) {
      autoScrollInterval = setInterval(() => {
        setActiveIndex((prevIndex) =>
          prevIndex === educations.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
    };
  }, [isMobile, isPaused, educations.length]);

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
    <SectionWrapper id="education">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="section-title">Education</h2>

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
                      className="card min-h-[420px] flex flex-col"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center mb-4">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <FaGraduationCap className="text-primary text-2xl" />
                        </div>
                        <div>
                          <h3 className="text-lg md:text-xl font-bold tracking-tight text-white mb-1">{education.degree}</h3>
                          <p className="text-text-secondary text-sm md:text-base font-medium">{education.institution}</p>
                        </div>
                      </div>
                      <div className="bg-primary/5 px-4 py-1.5 rounded-full inline-block mb-4 border border-primary/10 items-center justify-center w-max">
                        <p className="text-xs md:text-sm font-mono-accent text-primary tracking-wide opacity-90">{education.duration}</p>
                      </div>
                      <p className="text-text-secondary text-[15px] sm:text-base leading-relaxed mb-6">{education.description}</p>
                      <div>
                        <h4 className="text-base font-bold text-white mb-3 flex items-center">
                          <FaAward className="text-primary mr-2 text-base" />
                          Achievements
                        </h4>
                        <ul className="list-none space-y-2 text-text-secondary">
                          {education.achievements.map((achievement, i) => (
                            <li key={i} className="text-sm md:text-base relative pl-4 before:content-['▹'] before:absolute before:left-0 before:text-primary/60">{achievement}</li>
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
                  type="button"
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${activeIndex === index ? 'bg-[var(--color-teal)]' : 'bg-slate-700'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Desktop Layout */}
        {!isMobile && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
            {educations.map((education, index) => (
              <motion.div
                key={index}
                className="card h-full flex flex-col"
              >
                <div className="flex items-center mb-5">
                  <div className="bg-primary/10 p-3 rounded-2xl mr-4">
                    <FaGraduationCap className="text-primary text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold tracking-tight text-white mb-1">{education.degree}</h3>
                    <p className="text-text-secondary font-medium">{education.institution}</p>
                  </div>
                </div>
                <div className="bg-primary/5 px-4 py-1.5 rounded-full inline-block mb-5 border border-primary/10 w-fit">
                  <p className="text-xs md:text-sm font-mono-accent text-primary tracking-widest opacity-90">{education.duration}</p>
                </div>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-6">{education.description}</p>
                <div className="mt-auto">
                  <h4 className="text-base font-bold text-white mb-3 flex items-center">
                    <FaAward className="text-primary mr-2 text-base" />
                    Achievements
                  </h4>
                  <ul className="list-none space-y-2 text-text-secondary">
                    {education.achievements.map((achievement, i) => (
                      <li key={i} className="text-[15px] relative pl-4 before:content-['▹'] before:absolute before:left-0 before:text-primary/60">{achievement}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </SectionWrapper>
  );
};

export default Education;
