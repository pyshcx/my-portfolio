"use client";

import Image from 'next/image';
import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';
import { FaBrain, FaShieldAlt, FaCode } from 'react-icons/fa';

const About = () => {
  return (
    <SectionWrapper id="about">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        About Me
      </motion.h2>

      <div className="card max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Profile Image with subtle glow */}
          <motion.div
            className="relative w-48 h-48 sm:w-64 sm:h-64 flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-[var(--color-teal)] rounded-2xl rotate-6 opacity-20 blur-xl animate-pulse"></div>
            <motion.div
              className="w-full h-full relative z-10 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl"
              whileHover={{ rotate: 3, scale: 1.05 }}
            >
              <Image
                src="/IMG_1139.JPG"
                alt="Pranay Shah"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-2xl"
              />
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 text-white">
              Building the future of <span className="text-[var(--color-teal)]">Secure AI</span>
            </h3>

            <p className="section-text mb-4">
              I'm a B.Tech student at <span className="text-[var(--color-teal)] font-semibold">VIT Vellore</span> with a passion that spans three domains: <span className="text-[var(--color-teal)]">AI/ML engineering</span>, <span className="text-[var(--color-cyber)] font-semibold">cybersecurity</span>, and <span className="text-[var(--color-info)] font-semibold">software development</span>.
            </p>

            <p className="section-text mb-4">
              I'm joining <span className="text-[var(--color-cyber)] font-semibold">Flipkart</span> as an <span className="text-[var(--color-cyber)] font-semibold">Information Security Intern</span> — applying AI-driven threat detection in one of India's most demanding e-commerce environments. My prior research includes physics-informed deep learning at Ahmedabad University, generative AI at IIIT Delhi, and computer vision at MedAI Technologies.
            </p>

            <p className="section-text mb-8 italic text-slate-300">
              "I believe the most impactful systems are those that are both intelligent and secure — and I'm building toward that intersection."
            </p>

            {/* Core Areas - Unified Badge Styling */}
            <div className="flex flex-wrap gap-4">
              <motion.div
                className="badge-ai"
                whileHover={{ y: -3, boxShadow: "0 0 15px rgba(0, 242, 209, 0.2)" }}
              >
                <FaBrain className="text-lg" />
                <span>AI & Deep Learning</span>
              </motion.div>
              <motion.div
                className="badge-cyber"
                whileHover={{ y: -3, boxShadow: "0 0 15px rgba(249, 115, 22, 0.2)" }}
              >
                <FaShieldAlt className="text-lg" />
                <span>Cybersecurity Research</span>
              </motion.div>
              <motion.div
                className="badge-dev"
                whileHover={{ y: -3, boxShadow: "0 0 15px rgba(56, 189, 248, 0.2)" }}
              >
                <FaCode className="text-lg" />
                <span>Full-Stack Development</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;
