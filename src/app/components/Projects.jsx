"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { FaGithub, FaCode, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SectionWrapper from "./SectionWrapper";
import { motion, AnimatePresence } from "framer-motion";

/* ──────────────── 1. DATA ──────────────── */
const projects = [
  {
    title: "Hand Tracking Volume Controller",
    description:
      "Built a real-time hand-tracking system with Python and OpenCV.",
    githubLink: "https://github.com/pyshcx/volumetracking"
  },
  {
    title: "Automated News Summarization",
    description:
      "Fetches, summarizes and auto-tweets the latest AI/ML news.",
    githubLink: "https://github.com/pyshcx/ai-news-tweet-bot"
  },
  {
    title: "Delaunay Triangulation Path Planner",
    description:
      "Path-planning algorithm for autonomous nav using Delaunay Triangulation.",
    githubLink: "https://github.com/pyshcx/DelaunyTriangulation"
  },
  {
    title: "AI-Powered Car-Rental Feedback Analysis",
    description:
      "NLP pipeline that surfaces actionable insights from customer reviews.",
    githubLink: "https://github.com/pyshcx/car-rental-feedback-analyzer"
  }
];

/* ──────────────── 2. COMPONENT ──────────────── */
const Projects = () => {
  /* state */
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const isDragging = useRef(false);

  const slides = projects.length;
  const max = slides - 1;

  /* ———————————————————— 1. Mount handling ———————————————————— */
  useEffect(() => {
    setIsMounted(true);
  }, []);

  /* ———————————————————— 2. Responsive helper ———————————————————— */
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
      setActiveIndex((prev) => (prev >= max ? 0 : prev + 1));
    }, 5000); // Increased interval for better UX
    return () => clearInterval(id);
  }, [isPaused, max, isMounted]);

  /* ———————————————————— 4. Navigation functions ———————————————————— */
  const prev = useCallback(() => {
    setActiveIndex((i) => (i <= 0 ? max : i - 1));
  }, [max]);

  const next = useCallback(() => {
    setActiveIndex((i) => (i >= max ? 0 : i + 1));
  }, [max]);

  const goToSlide = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  /* ———————————————————— 5. Keyboard controls ———————————————————— */
  useEffect(() => {
    if (!isMounted) return;

    const onKey = (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 2000);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 2000);
      }
    };
    
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, isMounted]);

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
        next();
      } else {
        prev();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    isDragging.current = false;
    
    setTimeout(() => setIsPaused(false), 2000);
  }, [next, prev]);

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
        next();
      } else {
        prev();
      }
    }

    touchStartX.current = null;
    isDragging.current = false;
    setTimeout(() => setIsPaused(false), 2000);
  }, [isMobile, next, prev]);

  /* ———————————————————— 8. Visible projects calculation ———————————————————— */
  const visibleProjects = useMemo(() => {
    if (isMobile) {
      // On mobile, show only the active slide
      return [projects[activeIndex]];
    } else if (isTablet) {
      // On tablet, show 2 slides
      const visible = [];
      for (let i = 0; i < 2; i++) {
        const index = (activeIndex + i) % slides;
        visible.push({ ...projects[index], originalIndex: index });
      }
      return visible;
    } else {
      // On desktop, show 3 slides
      const visible = [];
      for (let i = 0; i < 3; i++) {
        const index = (activeIndex + i) % slides;
        visible.push({ ...projects[index], originalIndex: index });
      }
      return visible;
    }
  }, [activeIndex, slides, isMobile, isTablet]);

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
    <SectionWrapper id="projects">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-full"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#333] text-center mb-8 md:mb-12">
          Projects
        </h2>

        {/* ─────────────────────────── Carousel container ─────────────────────────── */}
        <div className="relative w-full max-w-7xl mx-auto px-4">
          {/* Navigation arrows - Desktop and Tablet only */}
          {!isMobile && (
            <>
              <button
                aria-label="Previous Project"
                onClick={() => {
                  prev();
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
                aria-label="Next Project"
                onClick={() => {
                  next();
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

          {/* Projects container */}
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
                  {visibleProjects.map((project, i) => (
                    <motion.div
                      key={isMobile ? `mobile-${activeIndex}` : `${project.originalIndex || activeIndex}-${i}`}
                      className="w-full"
                      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                      <div
                        className="bg-white bg-opacity-5 backdrop-blur-sm p-4 md:p-6 rounded-xl shadow-lg border border-[#00BFA6]/10 h-full flex flex-col transition-all duration-300 hover:bg-opacity-10 hover:border-[#00BFA6]/20 hover:shadow-xl min-h-[280px] md:min-h-[320px]"
                        style={{ 
                          WebkitBackdropFilter: 'blur(8px)',
                          backdropFilter: 'blur(8px)'
                        }}
                      >
                        <div className="flex-grow">
                          <div className="flex items-start mb-4">
                            <div className="bg-[#00BFA6] bg-opacity-10 p-2 md:p-3 rounded-full mr-3 flex-shrink-0">
                              <FaCode className="text-[#00BFA6] text-lg md:text-xl" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-base md:text-lg font-semibold text-[#333] leading-tight mb-2">
                                {project.title}
                              </h3>
                            </div>
                          </div>
                          
                          <p className="text-[#333] mb-6 text-sm md:text-base leading-relaxed">
                            {project.description}
                          </p>
                        </div>

                        <motion.a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-[#00BFA6] text-white py-2.5 md:py-3 px-4 md:px-5 rounded-lg hover:bg-[#82E9F5] hover:text-[#333] transition-all duration-300 flex items-center justify-center text-sm md:text-base font-medium mt-auto"
                          style={{ 
                            WebkitTapHighlightColor: 'transparent',
                            touchAction: 'manipulation'
                          }}
                        >
                          <FaGithub className="mr-2 text-base md:text-lg" />
                          View on GitHub
                        </motion.a>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Dots navigation */}
          <div className="flex justify-center mt-6 md:mt-8 space-x-2 flex-wrap gap-2">
            {projects.map((_, idx) => (
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
                aria-label={`Go to project ${idx + 1}`}
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

export default Projects;