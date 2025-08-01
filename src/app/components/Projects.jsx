"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { FaGithub, FaCode } from "react-icons/fa";
import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";

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
  const containerRef = useRef(null);
  const drag = useRef({ start: null, end: null });

  const slides = projects.length;
  const max = slides - 1;

  /* responsive helper */
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* auto-scroll */
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(
      () => setActiveIndex((i) => (i >= max ? 0 : i + 1)),
      4_000
    );
    return () => clearInterval(id);
  }, [isPaused, max]);

  /* keyboard arrows */
  const prev = useCallback(
    () => setActiveIndex((i) => (i <= 0 ? max : i - 1)),
    [max]
  );
  const next = useCallback(
    () => setActiveIndex((i) => (i >= max ? 0 : i + 1)),
    [max]
  );
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  /* pointer swipe */
  const threshold = () => {
    const w = containerRef.current?.offsetWidth ?? 300;
    return Math.min(w, 600) * 0.15;
  };
  const down = (e) => {
    setIsPaused(true);
    drag.current.start = e.clientX;
  };
  const move = (e) => {
    if (drag.current.start !== null) drag.current.end = e.clientX;
  };
  const up = () => {
    const { start, end } = drag.current;
    if (start !== null && end !== null && Math.abs(start - end) > threshold()) {
      start - end > 0 ? next() : prev();
    }
    drag.current = { start: null, end: null };
    setTimeout(() => setIsPaused(false), 1_000);
  };

  /* memoised visible slides */
  const shown = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 3; i++) {
      const idx = (activeIndex + i) % slides;
      arr.push({ ...projects[idx], idx });
    }
    return arr;
  }, [activeIndex, slides]);

  /* reduced-motion */
  const reduce = useMemo(
    () => typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  /* render */
  return (
    <SectionWrapper id="projects">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-4xl font-bold text-[#333] text-center mb-12">
          Projects
        </h2>

        {/* container */}
        <div
          ref={containerRef}
          className="relative max-w-6xl mx-auto px-4"
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerLeave={up}
        >
          {/* arrows */}
          <button
            aria-label="Prev"
            onClick={() => {
              prev();
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 1_000);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#00BFA6] bg-opacity-90 text-white shadow-lg hover:bg-[#00d3b8] focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
          >
            &#8592;
          </button>
          <button
            aria-label="Next"
            onClick={() => {
              next();
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 1_000);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#00BFA6] bg-opacity-90 text-white shadow-lg hover:bg-[#00d3b8] focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
          >
            &#8594;
          </button>

          {/* slides */}
          <div className="overflow-hidden mx-16">
            <motion.div
              className="flex"
              animate={{ x: 0 }}
              transition={
                reduce ? { duration: 0 } : { duration: 0.6, ease: "easeInOut" }
              }
            >
              {shown.map((p, i) => (
                <div
                  key={`${p.idx}-${activeIndex}`}
                  className="basis-full md:basis-1/3 flex-shrink-0 px-4"
                >
                  <motion.div
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(255,255,255,0.1)",
                      borderColor: "rgba(0,191,166,0.3)"
                    }}
                    className="bg-white bg-opacity-5 backdrop-blur-sm p-5 rounded-xl shadow-lg border border-[#00BFA6]/10 min-h-[260px] md:min-h-[300px] flex flex-col"
                  >
                    <div className="flex-grow">
                      <div className="flex items-center mb-3">
                        <div className="bg-[#00BFA6] bg-opacity-10 p-2 rounded-full mr-3">
                          <FaCode className="text-[#00BFA6] text-lg" />
                        </div>
                        <h3 className="text-lg font-semibold text-[#333] leading-tight">
                          {p.title}
                        </h3>
                      </div>
                      <p className="text-[#333] mb-4 text-sm leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    <motion.a
                      href={p.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-[#00BFA6] text-white py-2 px-4 rounded-lg hover:bg-[#82E9F5] hover:text-[#333] transition-all duration-300 flex items-center justify-center text-sm font-medium"
                    >
                      <FaGithub className="mr-2" />
                      View on GitHub
                    </motion.a>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* dots */}
          <div className="flex justify-center mt-8 space-x-2 flex-wrap">
            {projects.map((_, i) => (
              <button
                key={i}
                aria-label={`Slide ${i + 1}`}
                onClick={() => {
                  setIsPaused(true);
                  setActiveIndex(i);
                  setTimeout(() => setIsPaused(false), 1_000);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === i
                    ? "bg-[#00BFA6] scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
};

export default Projects;
