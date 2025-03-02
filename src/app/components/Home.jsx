"use client";

import { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Home = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/lidar-bg.jpg')" }}
    >
      {/* Darker overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-70"></div>
      
      {/* Gradient accent overlay */}
      <div className="absolute inset-0 section-gradient opacity-30"></div>

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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 icon-teal">
          Hi, I'm Pranay Shah
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-light mb-8 max-w-2xl mx-auto">
          Passionate about AI, ML, and autonomous systems, crafting the future of technology.
        </p>
        <motion.a
          href="#projects"
          className="btn-rounded text-lg inline-block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore My Work
        </motion.a>
      </motion.div>

      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      >
        <FaChevronDown className="icon-teal text-3xl" />
      </motion.div>
    </section>
  );
};

export default Home;
