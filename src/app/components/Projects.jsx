"use client";

import { FaGithub, FaCode, FaChevronLeft, FaChevronRight, FaExternalLinkAlt } from "react-icons/fa";
import SectionWrapper from "./SectionWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { useCarousel } from "../hooks/useCarousel";

/* ──────────────── 1. DATA ──────────────── */
const projects = [
  {
    title: "AI-Powered Threat Detection Pipeline",
    description:
      "Built an ML pipeline to automate network anomaly detection and alert triage. Applies unsupervised clustering and NLP-based log parsing to surface real threats from noise — reducing analyst workload significantly.",
    domain: "cyber",
    githubLink: "https://github.com/pyshcx"
  },
  {
    title: "Hand Tracking Volume Controller",
    description:
      "Built a real-time hand-tracking system with Python and OpenCV that maps hand gestures to system volume — zero-latency, no hardware required.",
    domain: "aiml",
    githubLink: "https://github.com/pyshcx/volumetracking"
  },
  {
    title: "Automated News Summarization & Tweet Bot",
    description:
      "Fetches, summarizes and auto-tweets the latest AI/ML news using NLP models. Combines LLM-based summarization with Twitter API for fully automated content curation.",
    domain: "aiml",
    githubLink: "https://github.com/pyshcx/ai-news-tweet-bot"
  },
  {
    title: "Delaunay Triangulation Path Planner",
    description:
      "Path-planning algorithm for autonomous formula-student vehicle navigation using Delaunay Triangulation — deployed on Team Ojas Racing's real car at Formula Bharat.",
    domain: "aiml",
    githubLink: "https://github.com/pyshcx/DelaunyTriangulation"
  },
  {
    title: "AI-Powered Car-Rental Feedback Analysis",
    description:
      "NLP pipeline that surfaces actionable insights from customer reviews, combining sentiment analysis with topic modelling — live hosted app.",
    domain: "dev",
    githubLink: "https://github.com/pyshcx/car-rental-feedback-analyzer",
    hostedLink: "https://car-rental-feedback-analyzer.pranayshah.online/"
  }
];

/* domain → style map */
const domainStyles = {
  cyber: {
    border: "border-[var(--color-cyber)]/25 hover:border-[var(--color-cyber)]/50",
    iconBg: "rgba(255,107,53,0.15)",
    iconColor: "var(--color-cyber)",
    badge: <span className="badge-cyber">🔒 Cybersecurity</span>,
  },
  aiml: {
    border: "border-[var(--color-teal)]/15 hover:border-[var(--color-teal)]/35",
    iconBg: "rgba(0,191,166,0.12)",
    iconColor: "var(--color-teal)",
    badge: <span className="badge-ai">🤖 AI / ML</span>,
  },
  dev: {
    border: "border-[var(--color-info)]/20 hover:border-[var(--color-info)]/40",
    iconBg: "rgba(130,233,245,0.10)",
    iconColor: "var(--color-info)",
    badge: <span className="badge-dev">💻 Full-Stack</span>,
  },
};

/* ──────────────── 2. COMPONENT ──────────────── */
const Projects = () => {
  const {
    activeIndex,
    isMounted,
    isMobile,
    prefersReducedMotion,
    visibleItems,
    gridClass,
    containerRef,
    count,
    prevSlide,
    nextSlide,
    goToSlide,
    pauseTemporarily,
    swipeHandlers,
  } = useCarousel(projects);

  if (!isMounted) return null;

  return (
    <SectionWrapper id="projects">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-full"
      >
        <h2 className="section-title">Projects</h2>

        <div className="relative w-full max-w-7xl mx-auto px-4">
          {/* Navigation arrows — Desktop / Tablet only */}
          {!isMobile && (
            <>
              <button
                aria-label="Previous Project"
                type="button"
                onClick={() => { prevSlide(); pauseTemporarily(); }}
                className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-[var(--color-teal)] bg-opacity-90 text-slate-950 shadow-lg hover:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
              >
                <FaChevronLeft className="text-sm md:text-base" />
              </button>

              <button
                aria-label="Next Project"
                type="button"
                onClick={() => { nextSlide(); pauseTemporarily(); }}
                className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-[var(--color-teal)] bg-opacity-90 text-slate-950 shadow-lg hover:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
              >
                <FaChevronRight className="text-sm md:text-base" />
              </button>
            </>
          )}

          {/* Projects container */}
          <div
            className={`overflow-hidden ${!isMobile ? "mx-8 md:mx-16" : "mx-0"}`}
            ref={containerRef}
          >
            <div
              className="touch-pan-y select-none"
              {...swipeHandlers}
              style={{ WebkitTouchCallout: "none", WebkitUserSelect: "none", userSelect: "none" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  className={`grid gap-4 md:gap-6 ${gridClass}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, ease: "easeInOut" }}
                >
                  {visibleItems.map((project, i) => {
                    const style = domainStyles[project.domain] || domainStyles.aiml;
                    return (
                      <motion.div
                        key={isMobile ? `mobile-${activeIndex}` : `${project.originalIndex}-${i}`}
                        className="w-full"
                        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                      >
                        <div
                          className={`card p-4 md:p-6 shadow-lg h-full flex flex-col transition-all duration-300 hover:shadow-xl ${style.border}`}
                          style={{ minHeight: "400px" }}
                        >
                          <div className="flex-grow flex flex-col">
                            <div className="flex items-start mb-4">
                              <div
                                className="p-2 md:p-3 rounded-full mr-3 flex-shrink-0"
                                style={{ background: style.iconBg }}
                              >
                                <FaCode
                                  className="text-lg md:text-xl"
                                  style={{ color: style.iconColor }}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-base md:text-lg font-semibold text-[var(--color-text-primary)] leading-tight mb-2">
                                  {project.title}
                                </h3>
                                <div className="flex flex-wrap gap-1.5">
                                  {style.badge}
                                </div>
                              </div>
                            </div>

                            <div className="flex-grow">
                              <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-4">
                                {project.description}
                              </p>
                            </div>
                          </div>

                          {/* Buttons */}
                          <div className="mt-auto pt-4">
                            {project.hostedLink ? (
                              <div className="flex flex-col gap-3">
                                <motion.a
                                  href={project.hostedLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  className="w-full bg-transparent border-2 border-[var(--color-teal)]/40 text-[var(--color-teal)] py-3 px-5 rounded-lg hover:bg-[var(--color-teal)]/5 hover:border-[var(--color-teal)]/60 transition-all duration-300 flex items-center justify-center text-sm md:text-base font-medium"
                                >
                                  <FaExternalLinkAlt className="mr-2 text-sm" />
                                  Live Demo
                                </motion.a>

                                <motion.a
                                  href={project.githubLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  className="w-full bg-[var(--color-teal)] text-slate-950 py-3 px-5 rounded-lg hover:bg-white transition-all duration-300 flex items-center justify-center text-sm md:text-base font-medium shadow-md hover:shadow-lg"
                                >
                                  <FaGithub className="mr-2 text-base" />
                                  View on GitHub
                                </motion.a>
                              </div>
                            ) : (
                              <motion.a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full btn-primary flex items-center justify-center"
                              >
                                <FaGithub className="mr-2 text-base" />
                                View on GitHub
                              </motion.a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Dots navigation */}
          <div className="flex justify-center mt-6 md:mt-8 space-x-2 flex-wrap gap-2">
            {projects.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => { pauseTemporarily(); goToSlide(idx); }}
                className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)] focus:ring-offset-1 ${activeIndex === idx
                    ? "bg-[var(--color-teal)] scale-125 shadow-md"
                    : "bg-slate-700 hover:bg-slate-600 hover:scale-110"
                  }`}
                aria-label={`Go to project ${idx + 1}`}
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
