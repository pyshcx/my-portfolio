"use client";

import { useEffect, useState, useMemo } from 'react';
import { FaChevronDown, FaShieldAlt, FaBrain, FaCode } from 'react-icons/fa';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useLoading } from './LoadingContext';

const roles = [
  "Software Developer · AI/ML Engineer",
  "Cybersecurity Researcher",
  "Building Secure Intelligent Systems",
];

const roleBadges = [
  { label: "AI / ML", icon: FaBrain, badgeClass: "badge-ai" },
  { label: "Cybersecurity", icon: FaShieldAlt, badgeClass: "badge-cyber" },
  { label: "Software Dev", icon: FaCode, badgeClass: "badge-dev" },
];

const Home = () => {
  const controls = useAnimation();
  const { loading } = useLoading();
  const [isClient, setIsClient] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    setIsClient(true);
    if (!loading) {
      controls.start("visible");
    }
  }, [loading, controls]);

  // Cycle through role taglines every 2.8s
  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  const particles = useMemo(() => {
    return [...Array(50)].map((_, i) => ({
      key: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 5 + 1}px`,
      duration: `${Math.random() * 10 + 5}s`,
    }));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/lidar-bg.jpg')" }}
    >
      {/* Mesh Gradient Overlay - reduced opacity to keep image visible */}
      <div className="absolute inset-0 animate-mesh opacity-40"></div>

      {/* Deep Overlay for text readability */}
      <div className="absolute inset-0 bg-slate-950/60 transition-opacity duration-700"></div>

      {/* Floating particles - kept for extra depth but reduced opacity */}
      {isClient && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.key}
              className="absolute bg-[var(--color-teal)] rounded-full opacity-10"
              style={{
                top: particle.top,
                left: particle.left,
                width: particle.size,
                height: particle.size,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: parseFloat(particle.duration),
                repeat: Infinity,
                ease: "linear"
              }}
            ></motion.div>
          ))}
        </div>
      )}

      <motion.div
        className="relative z-10 px-4 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={loading ? "hidden" : "visible"}
      >
        {/* Intro */}
        <motion.p
          className="text-[var(--color-teal)] font-mono-accent mb-4 tracking-widest text-sm uppercase"
          variants={itemVariants}
        >
          Intelligence & Security
        </motion.p>

        {/* Name with glow */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-8xl font-black mb-6 text-white tracking-tight leading-none"
          variants={itemVariants}
        >
          Hi, I'm <span className="text-[var(--color-teal)] drop-shadow-[0_0_15px_rgba(0,242,209,0.3)]">Pranay Shah</span>
        </motion.h1>

        {/* Rotating role tagline */}
        <motion.div
          className="h-12 mb-8 flex items-center justify-center overflow-hidden"
          variants={itemVariants}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              className="text-xl sm:text-2xl md:text-3xl text-slate-300 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {roles[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Role badge pills - Using unified classes */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          variants={itemVariants}
        >
          {roleBadges.map(({ label, icon: Icon, badgeClass }) => (
            <motion.span
              key={label}
              className={`${badgeClass} text-sm md:text-base cursor-default`}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <Icon className="text-lg" />
              {label}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.a
          href="#projects"
          className="btn-rounded text-xl inline-block px-12 py-4"
          variants={itemVariants}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 30px rgba(0,242,209,0.4)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          View Projects
        </motion.a>
      </motion.div>

      {/* Scroll hint chevron */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: {
            opacity: [0.2, 1, 0.2],
            y: [0, -10, 0],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop"
            }
          }
        }}
      >
        <FaChevronDown className="icon-teal text-3xl" />
      </motion.div>
    </section>
  );
};

export default Home;
