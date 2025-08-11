"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { FaBriefcase, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SectionWrapper from "./SectionWrapper";
import { motion, AnimatePresence } from "framer-motion";

/* ──────────────────────────────────────────────────────────────────── */
/*  DATA                                                              */
/* ──────────────────────────────────────────────────────────────────── */
const experiences = [
  {
    title: "Path Planning Head · Team Ojas Racing",
    date: "Mar 2023 – Present",
    points: [
      "Developed a path-planning algorithm using Delaunay Triangulation for autonomous navigation.",
      "Implemented YOLO for real-time object detection, improving obstacle avoidance."
    ]
  },
  {
    title: "AI/ML Intern · MedAI Technologies",
    date: "Sep 2024 – Dec 2024",
    points: [
      "Integrated computer-vision technology into a kiosk system.",
      "Conducted research on AI/ML models for medical diagnostics."
    ]
  },
  {
    title: "Tech Intern · Alfaleus Technology Private Limited",
    date: "Jun 2025",
    points: [
      "Selected among top 10% of over 1200 applicants for intensive virtual 7-day bootcamp.",
    "Successfully completed assignments in ID_Mech and Research domains with exceptional technical skills."
    ]
  },
  {
    title: "Research Intern · Ahmedabad University",
    date: "May 2025 – Jul 2025",
    points: [
      "Built a physics-based deep-learning model that predicts heat-transfer spatiotemporal fields from CFD data.",
      "Designed an improved ConvLSTM2D with custom physics-informed loss, achieving high accuracy and major speed-ups."
    ]
  },
  {
    title: "Summer Research Intern · IIIT Delhi",
    date: "May 2025 – Jul 2025",
    points: [
      "Worked on image- and story-generation with consistency using knowledge graphs.",
      "Devised methods for coherent visual + textual narratives by integrating structured knowledge."
    ]
  }
];

/* ──────────────────────────────────────────────────────────────────── */
/*  COMPONENT                                                         */
/* ──────────────────────────────────────────────────────────────────── */
const Experiences = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const isDragging = useRef(false);
  const slidesCount = experiences.length;
  const maxIndex = slidesCount - 1;

  /* ———————————————————— 1. Mount handling ———————————————————— */
  useEffect(() => {
    setIsMounted(true);
  }, []);

  /* ———————————————————— 2. Responsiveness helper ———————————————————— */
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: typeof window !== "undefined" ? window.innerHeight : 768
  });

  const isMobile = screenSize.width < 768;
  const isTablet = screenSize.width >= 768 && screenSize.width < 1024;
  const isDesktop = screenSize.width >= 1024;

  useEffect(() => {
    if (!isMounted) return;
    
    const updateScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, [isMounted]);

  /* ———————————————————— 3. Auto-scroll ———————————————————— */
  useEffect(() => {
    if (isPaused || !isMounted) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000); // Increased interval for better UX
    return () => clearInterval(id);
  }, [isPaused, maxIndex, isMounted]);

  /* ———————————————————— 4. Navigation functions ———————————————————— */
  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goToSlide = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  /* ———————————————————— 5. Keyboard controls ———————————————————— */
  useEffect(() => {
    if (!isMounted) return;

    const onKey = (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 2000);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextSlide();
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 2000);
      }
    };
    
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prevSlide, nextSlide, isMounted]);

  /* ———————————————————— 6. Touch/Swipe controls ———————————————————— */
  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
    isDragging.current = false;
    setIsPaused(true);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!touchStartX.current || !touchStartY.current) return;
    
    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - touchStartX.current);
    const deltaY = Math.abs(touch.clientY - touchStartY.current);
    
    // Only prevent default if horizontal swipe is more significant than vertical
    if (deltaX > deltaY && deltaX > 10) {
      e.preventDefault();
      isDragging.current = true;
    }
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (!touchStartX.current || !isDragging.current) {
      setIsPaused(false);
      return;
    }

    const touch = e.changedTouches[0];
    const deltaX = touchStartX.current - touch.clientX;
    const minSwipeDistance = 50;

    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    isDragging.current = false;
    
    setTimeout(() => setIsPaused(false), 2000);
  }, [nextSlide, prevSlide]);

  /* ———————————————————— 7. Mouse drag for desktop ———————————————————— */
  const handleMouseDown = useCallback((e) => {
    if (isMobile) return;
    touchStartX.current = e.clientX;
    isDragging.current = false;
    setIsPaused(true);
  }, [isMobile]);

  const handleMouseMove = useCallback((e) => {
    if (isMobile || !touchStartX.current) return;
    const deltaX = Math.abs(e.clientX - touchStartX.current);
    if (deltaX > 10) {
      isDragging.current = true;
    }
  }, [isMobile]);

  const handleMouseUp = useCallback((e) => {
    if (isMobile || !touchStartX.current || !isDragging.current) {
      setIsPaused(false);
      return;
    }

    const deltaX = touchStartX.current - e.clientX;
    const minSwipeDistance = 80;

    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    touchStartX.current = null;
    isDragging.current = false;
    setTimeout(() => setIsPaused(false), 2000);
  }, [isMobile, nextSlide, prevSlide]);

  /* ———————————————————— 8. Visible experiences calculation ———————————————————— */
  const visibleExperiences = useMemo(() => {
    if (isMobile) {
      // On mobile, show only the active slide
      return [experiences[activeIndex]];
    } else if (isTablet) {
      // On tablet, show 2 slides
      const visible = [];
      for (let i = 0; i < 2; i++) {
        const index = (activeIndex + i) % slidesCount;
        visible.push({ ...experiences[index], originalIndex: index });
      }
      return visible;
    } else {
      // On desktop, show 3 slides
      const visible = [];
      for (let i = 0; i < 3; i++) {
        const index = (activeIndex + i) % slidesCount;
        visible.push({ ...experiences[index], originalIndex: index });
      }
      return visible;
    }
  }, [activeIndex, slidesCount, isMobile, isTablet]);

  /* ———————————————————— 9. Reduced motion preference ———————————————————— */
  const prefersReducedMotion = useMemo(() => {
    if (!isMounted) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  /* ———————————————————— 10. Render ———————————————————— */
  return (
    <SectionWrapper id="experience">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-full"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#333] text-center mb-8 md:mb-12">
          Experience
        </h2>

        {/* ─────────────────────────── Carousel container ─────────────────────────── */}
        <div className="relative w-full max-w-7xl mx-auto px-4">
          {/* Navigation arrows - Desktop and Tablet only */}
          {!isMobile && (
            <>
              <button
                aria-label="Previous Experience"
                onClick={() => {
                  prevSlide();
                  setIsPaused(true);
                  setTimeout(() => setIsPaused(false), 2000);
                }}
                className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-[#00BFA6] bg-opacity-90 text-white shadow-lg hover:bg-[#00d3b8] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#00BFA6] disabled:opacity-50"
                style={{ 
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation'
                }}
              >
                <FaChevronLeft className="text-sm md:text-base" />
              </button>

              <button
                aria-label="Next Experience"
                onClick={() => {
                  nextSlide();
                  setIsPaused(true);
                  setTimeout(() => setIsPaused(false), 2000);
                }}
                className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-[#00BFA6] bg-opacity-90 text-white shadow-lg hover:bg-[#00d3b8] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#00BFA6] disabled:opacity-50"
                style={{ 
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation'
                }}
              >
                <FaChevronRight className="text-sm md:text-base" />
              </button>
            </>
          )}

          {/* Slides container */}
          <div 
            className={`overflow-hidden ${!isMobile ? 'mx-8 md:mx-16' : 'mx-0'}`}
            ref={containerRef}
          >
            <div
              className="touch-pan-y select-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{ 
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                userSelect: 'none'
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  className={`grid gap-4 md:gap-6 ${
                    isMobile 
                      ? 'grid-cols-1' 
                      : isTablet 
                      ? 'grid-cols-2' 
                      : 'grid-cols-1 lg:grid-cols-3'
                  }`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.4, ease: "easeInOut" }
                  }
                >
                  {visibleExperiences.map((exp, i) => (
                    <motion.div
                      key={isMobile ? `mobile-${activeIndex}` : `${exp.originalIndex || activeIndex}-${i}`}
                      className="w-full"
                      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                      <div
                        className="bg-white bg-opacity-10 backdrop-blur-sm p-4 md:p-6 rounded-xl shadow-lg border border-[#00BFA6]/10 h-full flex flex-col transition-all duration-300 hover:bg-opacity-15 hover:border-[#00BFA6]/20 hover:shadow-xl min-h-[280px] md:min-h-[320px]"
                        style={{ 
                          WebkitBackdropFilter: 'blur(8px)',
                          backdropFilter: 'blur(8px)'
                        }}
                      >
                        <div className="flex items-start mb-4">
                          <div className="bg-[#00BFA6] bg-opacity-10 p-2 md:p-3 rounded-full mr-3 flex-shrink-0">
                            <FaBriefcase className="text-[#00BFA6] text-lg md:text-xl" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base md:text-lg font-semibold text-[#333] leading-tight mb-1">
                              {exp.title}
                            </h3>
                            <p className="text-xs md:text-sm text-[#666] italic">
                              {exp.date}
                            </p>
                          </div>
                        </div>

                        <ul className="list-disc ml-4 md:ml-5 space-y-2 text-[#333] flex-grow">
                          {exp.points.map((pt, idx) => (
                            <li key={idx} className="text-sm md:text-base leading-relaxed">
                              {pt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Dots navigation */}
          <div className="flex justify-center mt-6 md:mt-8 space-x-2 flex-wrap gap-2">
            {experiences.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsPaused(true);
                  goToSlide(idx);
                  setTimeout(() => setIsPaused(false), 2000);
                }}
                className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00BFA6] focus:ring-offset-1 ${
                  activeIndex === idx
                    ? "bg-[#00BFA6] scale-125 shadow-md"
                    : "bg-gray-300 hover:bg-gray-400 hover:scale-110"
                }`}
                aria-label={`Go to experience ${idx + 1}`}
                style={{ 
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation'
                }}
              />
            ))}
          </div>

          {/* Mobile swipe hint */}
          {isMobile && (
            <p className="text-center text-xs text-gray-500 mt-4 opacity-75">
              Swipe left or right to navigate
            </p>
          )}
        </div>
      </motion.div>
    </SectionWrapper>
  );
};

export default Experiences;
