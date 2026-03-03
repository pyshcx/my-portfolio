"use client";

import { useEffect, useState } from 'react';
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

  const generateParticles = () => {
    return [...Array(50)].map((_, i) => ({
      key: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 5 + 1}px`,
      duration: `${Math.random() * 10 + 5}s`,
    }));
  };

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
      {/* Dark overlay — slightly deeper */}
      <div className="absolute inset-0 bg-[var(--color-bg-deep)] opacity-75"></div>
      <div className="absolute inset-0 section-gradient opacity-20"></div>

      {/* Floating particles */}
      {isClient && (
        <div className="absolute inset-0">
          {generateParticles().map((particle) => (
            <div
              key={particle.key}
              className="absolute icon-teal rounded-full opacity-20"
              style={{
                top: particle.top,
                left: particle.left,
                width: particle.size,
                height: particle.size,
                animation: `float ${particle.duration} linear infinite`,
              }}
            ></div>
          ))}
        </div>
      )}

      <motion.div
        className="relative z-10 px-4 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Name */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 text-[var(--color-teal)]"
          variants={itemVariants}
        >
          Hi, I'm Pranay Shah
        </motion.h1>

        {/* Rotating role tagline */}
        <motion.div
          className="h-10 mb-6 flex items-center justify-center overflow-hidden"
          variants={itemVariants}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              className="text-lg sm:text-xl md:text-2xl text-[var(--color-text-secondary)] font-mono-accent"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              {roles[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Role badge pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-8"
          variants={itemVariants}
        >
          {roleBadges.map(({ label, icon: Icon, badgeClass }) => (
            <span
              key={label}
              className={`flex items-center gap-1.5 px-4 py-1.5 transition-all duration-300 hover:scale-105 ${badgeClass}`}
            >
              <Icon className="text-xs" />
              {label}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.a
          href="#projects"
          className="btn-rounded text-lg inline-block"
          variants={itemVariants}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 18px rgba(0,191,166,0.6)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          Explore My Work
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
