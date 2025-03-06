"use client";

import { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import { useLoading } from './LoadingContext';

const Home = () => {
  const controls = useAnimation();
  const { loading } = useLoading();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (!loading) {
      controls.start("visible");
    }
  }, [loading, controls]);

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
      <div className="absolute inset-0 bg-black opacity-70"></div>
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
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 icon-teal"
          variants={itemVariants}
        >
          Hi, I'm Pranay Shah
        </motion.h1>

        <motion.p 
          className="text-lg sm:text-xl md:text-2xl text-light mb-8 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Passionate about AI, ML, and autonomous systems, crafting the future of technology.
        </motion.p>

        <motion.a
          href="#projects"
          className="btn-rounded text-lg inline-block"
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0px 0px 8px rgb(0,191,166)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          Explore My Work
        </motion.a>
      </motion.div>

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
