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
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-16">
          {/* Profile Image with subtle glow */}
          <motion.div
            className="relative w-48 h-48 sm:w-64 sm:h-64 flex-shrink-0 mx-auto md:mx-0"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-primary rounded-3xl rotate-6 opacity-[0.08] blur-xl animate-pulse"></div>
            <motion.div
              className="w-full h-full relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/5"
              whileHover={{ rotate: 2, scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src="/IMG_1139.JPG"
                alt="Pranay Shah"
                fill
                style={{ objectFit: 'cover' }}
                className="scale-105"
              />
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-white tracking-tight">
              Building the future of <span className="text-primary font-black">Secure AI.</span>
            </h3>

            <div className="space-y-5">
              <p className="text-text-secondary text-lg leading-relaxed">
                I'm a B.Tech student at <span className="text-primary font-semibold">VIT Vellore</span> with a passion that spans three domains: <span className="text-primary font-medium">AI/ML engineering</span>, <span className="text-cyber font-medium">cybersecurity</span>, and <span className="text-info font-medium">software development</span>.
              </p>

              <p className="text-text-secondary text-lg leading-relaxed">
                I'm joining <span className="text-cyber font-medium">Flipkart</span> as an <span className="text-cyber font-semibold">Information Security Intern</span> — applying AI-driven threat detection in one of India's most demanding e-commerce environments. My prior research spans physics-informed deep learning at <span className="text-primary">Ahmedabad University</span>, generative AI at <span className="text-primary">IIIT Delhi</span>, and computer vision at MedAI Technologies.
              </p>
            </div>

            {/* Core Areas - Unified Badge Styling */}
            <div className="flex flex-wrap gap-3 mt-8">
              <motion.div
                className="badge-ai text-sm py-2 px-4 shadow-none"
                whileHover={{ y: -2, background: "rgba(0,242,209,0.15)" }}
              >
                <FaBrain className="text-base" />
                <span>AI & Deep Learning</span>
              </motion.div>
              <motion.div
                className="badge-cyber text-sm py-2 px-4 shadow-none"
                whileHover={{ y: -2, background: "rgba(249,115,22,0.15)" }}
              >
                <FaShieldAlt className="text-base" />
                <span>Cybersecurity</span>
              </motion.div>
              <motion.div
                className="badge-dev text-sm py-2 px-4 shadow-none"
                whileHover={{ y: -2, background: "rgba(56,189,248,0.15)" }}
              >
                <FaCode className="text-base" />
                <span>Software Dev</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;
