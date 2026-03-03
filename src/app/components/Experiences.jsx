"use client";

import { FaBriefcase, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SectionWrapper from "./SectionWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { useCarousel } from "../hooks/useCarousel";

/* ──────────────────────────────────────────────────────────────────── */
/*  DATA                                                              */
/* ──────────────────────────────────────────────────────────────────── */
const experiences = [
  {
    title: "Information Security Intern · Flipkart",
    date: "Jan 2026 – Present",
    domain: "cyber",
    points: [
      "Developing a RAG-based document parser to automate Data Flow Diagram (DFD) generation, streamlining security architecture visualization and threat modeling workflows.",
      "Contributing to Layer 7 Web Application Firewall (WAF) projects to enhance perimeter security and mitigate application-level vulnerabilities.",
      "Conducting comprehensive Architecture Security Reviews (ASR) to identify and remediate design-level security flaws in distributed systems."
    ]
  },
  {
    title: "Path Planning Head · Team Ojas Racing",
    date: "Mar 2023 – Dec 2025",
    domain: "aiml",
    points: [
      "Developed a path-planning algorithm using Delaunay Triangulation for autonomous navigation.",
      "Implemented YOLO for real-time object detection, improving obstacle avoidance."
    ]
  },
  {
    title: "AI/ML Intern · MedAI Technologies",
    date: "Sep 2024 – Dec 2024",
    domain: "aiml",
    points: [
      "Integrated computer-vision technology into a kiosk system.",
      "Conducted research on AI/ML models for medical diagnostics."
    ]
  },
  {
    title: "Tech Intern · Alfaleus Technology Private Limited",
    date: "Jun 2025",
    domain: "dev",
    points: [
      "Selected among top 10% of over 1200 applicants for intensive virtual 7-day bootcamp.",
      "Successfully completed assignments in ID_Mech and Research domains with exceptional technical skills."
    ]
  },
  {
    title: "Research Intern · Ahmedabad University",
    date: "May 2025 – Jul 2025",
    domain: "research",
    points: [
      "Built a physics-based deep-learning model that predicts heat-transfer spatiotemporal fields from CFD data.",
      "Designed an improved ConvLSTM2D with custom physics-informed loss, achieving high accuracy and major speed-ups."
    ]
  },
  {
    title: "Summer Research Intern · IIIT Delhi",
    date: "May 2025 – Jul 2025",
    domain: "research",
    points: [
      "Worked on image- and story-generation with consistency using knowledge graphs.",
      "Devised methods for coherent visual + textual narratives by integrating structured knowledge."
    ]
  }
];

/* domain → style map */
const domainStyles = {
  cyber: {
    border: "border-[var(--color-cyber)]/20 hover:border-[var(--color-cyber)]/40",
    iconBg: "rgba(255,107,53,0.15)",
    iconColor: "var(--color-cyber)",
    badge: <span className="badge-cyber">🔒 Cybersecurity</span>,
  },
  aiml: {
    border: "border-[var(--color-teal)]/15 hover:border-[var(--color-teal)]/30",
    iconBg: "rgba(0,191,166,0.12)",
    iconColor: "var(--color-teal)",
    badge: <span className="badge-ai">🤖 AI / ML</span>,
  },
  dev: {
    border: "border-[var(--color-info)]/20 hover:border-[var(--color-info)]/40",
    iconBg: "rgba(130,233,245,0.12)",
    iconColor: "var(--color-info)",
    badge: <span className="badge-dev">⚙️ Dev</span>,
  },
  research: {
    border: "border-[var(--color-teal)]/15 hover:border-[var(--color-teal)]/30",
    iconBg: "rgba(0,191,166,0.12)",
    iconColor: "var(--color-teal)",
    badge: <span className="badge-ai">🔬 Research</span>,
  },
};

/* ──────────────────────────────────────────────────────────────────── */
/*  COMPONENT                                                         */
/* ──────────────────────────────────────────────────────────────────── */
const Experiences = () => {
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
  } = useCarousel(experiences);

  if (!isMounted) return null;

  return (
    <SectionWrapper id="experience">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-full"
      >
        <h2 className="section-title">Experience</h2>

        {/* Carousel container */}
        <div className="relative w-full max-w-7xl mx-auto px-4">
          {/* Navigation arrows — Desktop / Tablet only */}
          {!isMobile && (
            <>
              <button
                aria-label="Previous Experience"
                type="button"
                onClick={() => { prevSlide(); pauseTemporarily(); }}
                className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-[var(--color-teal)] bg-opacity-90 text-slate-950 shadow-lg hover:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
              >
                <FaChevronLeft className="text-sm md:text-base" />
              </button>

              <button
                aria-label="Next Experience"
                type="button"
                onClick={() => { nextSlide(); pauseTemporarily(); }}
                className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-[var(--color-teal)] bg-opacity-90 text-slate-950 shadow-lg hover:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
              >
                <FaChevronRight className="text-sm md:text-base" />
              </button>
            </>
          )}

          {/* Slides */}
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
                  {visibleItems.map((exp, i) => {
                    const style = domainStyles[exp.domain] || domainStyles.aiml;
                    return (
                      <motion.div
                        key={isMobile ? `mobile-${activeIndex}` : `${exp.originalIndex}-${i}`}
                        className="w-full"
                        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                      >
                        <div className={`card p-4 md:p-6 shadow-lg h-full flex flex-col transition-all duration-300 min-h-[280px] md:min-h-[320px] ${style.border}`}>
                          <div className="flex items-start mb-3">
                            <div
                              className="p-2 md:p-3 rounded-full mr-3 flex-shrink-0"
                              style={{ background: style.iconBg }}
                            >
                              <FaBriefcase
                                className="text-lg md:text-xl"
                                style={{ color: style.iconColor }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-base md:text-lg font-semibold text-slate-100 leading-tight mb-1">
                                {exp.title}
                              </h3>
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-xs md:text-sm text-slate-400 italic">{exp.date}</p>
                                {style.badge}
                              </div>
                            </div>
                          </div>

                          <ul className="list-disc ml-4 md:ml-5 space-y-2 text-slate-300 flex-grow">
                            {exp.points.map((pt, idx) => (
                              <li key={idx} className="text-sm md:text-base leading-relaxed">
                                {pt}
                              </li>
                            ))}
                          </ul>
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
            {experiences.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => { pauseTemporarily(); goToSlide(idx); }}
                className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)] focus:ring-offset-1 ${activeIndex === idx
                    ? "bg-[var(--color-teal)] scale-125 shadow-md"
                    : "bg-slate-700 hover:bg-slate-600 hover:scale-110"
                  }`}
                aria-label={`Go to experience ${idx + 1}`}
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
