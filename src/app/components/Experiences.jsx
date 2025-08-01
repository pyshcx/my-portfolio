"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { FaBriefcase } from "react-icons/fa";
import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";

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
  const containerRef = useRef(null);
  const dragX = useRef({ start: null, end: null });
  const slidesCount = experiences.length;
  const maxIndex = slidesCount - 1;

  /* ———————————————————— 1. Responsiveness helper ———————————————————— */
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* ———————————————————— 2. Auto-scroll ———————————————————— */
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4_000);
    return () => clearInterval(id);
  }, [isPaused, maxIndex]);

  /* ———————————————————— 3. Keyboard controls ———————————————————— */
  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);
  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prevSlide, nextSlide]);

  /* ———————————————————— 4. Swipe / drag controls ———————————————————— */
  const swipeThreshold = () => {
    const w = containerRef.current?.offsetWidth ?? 300;
    return Math.min(w, 600) * 0.15; // 15 % of viewport width
  };
  const handlePointerDown = (e) => {
    setIsPaused(true);
    dragX.current.start = e.clientX;
  };
  const handlePointerMove = (e) => {
    if (dragX.current.start !== null) dragX.current.end = e.clientX;
  };
  const handlePointerUp = () => {
    const { start, end } = dragX.current;
    if (start !== null && end !== null) {
      const diff = start - end;
      if (Math.abs(diff) > swipeThreshold()) {
        diff > 0 ? nextSlide() : prevSlide();
      }
    }
    dragX.current = { start: null, end: null };
    setTimeout(() => setIsPaused(false), 1_000);
  };

  /* ———————————————————— 5. Visible slide window (memoised) ———————————————————— */
  const visibleExperiences = useMemo(() => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (activeIndex + i) % slidesCount;
      visible.push({ ...experiences[index], originalIndex: index });
    }
    return visible;
  }, [activeIndex, slidesCount]);

  /* ———————————————————— 6. Reduced motion preference ———————————————————— */
  const prefersReducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  /* ———————————————————— 7. Render ———————————————————— */
  return (
    <SectionWrapper id="experience">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-4xl font-bold text-[#333] text-center mb-12">
          Experience
        </h2>

        {/* ─────────────────────────── Carousel container ─────────────────────────── */}
        <div
          className="relative max-w-6xl mx-auto px-4"
          ref={containerRef}
          /* Unified pointer events */
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {/* ← Arrow */}
          <button
            aria-label="Previous Experience"
            onClick={() => {
              prevSlide();
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 1_000);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#00BFA6] bg-opacity-90 text-white shadow-lg hover:bg-[#00d3b8] transition focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
          >
            &#8592;
          </button>

          {/* → Arrow */}
          <button
            aria-label="Next Experience"
            onClick={() => {
              nextSlide();
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 1_000);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#00BFA6] bg-opacity-90 text-white shadow-lg hover:bg-[#00d3b8] transition focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
          >
            &#8594;
          </button>

          {/* Slides */}
          <div className="overflow-hidden mx-16">
            <motion.div
              className="flex"
              animate={{ x: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.6, ease: "easeInOut", type: "tween" }
              }
            >
              {visibleExperiences.map((exp, i) => (
                <div
                  key={`${exp.originalIndex}-${activeIndex}`}
                  className="basis-full md:basis-1/3 flex-shrink-0 px-4"
                >
                  <motion.div
                    className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-[#00BFA6]/10 min-h-[300px] md:min-h-[350px] flex flex-col"
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
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
                        <h3 className="text-lg font-semibold text-[#333]">
                          {exp.title}
                        </h3>
                        <p className="text-sm text-[#333] italic">{exp.date}</p>
                      </div>
                    </div>

                    <ul className="list-disc ml-5 space-y-2 text-[#333] flex-grow">
                      {exp.points.map((pt, idx) => (
                        <li key={idx} className="text-sm">
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-2 flex-wrap">
            {experiences.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsPaused(true);
                  setActiveIndex(idx);
                  setTimeout(() => setIsPaused(false), 1_000);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? "bg-[#00BFA6] scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
};

export default Experiences;
