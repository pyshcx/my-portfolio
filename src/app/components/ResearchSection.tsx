"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ChevronRight, Award, Clock } from 'lucide-react';

const researchProjects = [
  {
    title: "Transformer-Driven Steganographic Watermarking",
    description: "Published research on digital watermarking using Vision Transformers and SHA-256 cryptographic security, achieving 54.22 dB PSNR and 0.9995 SSIM. Trained on 118K images (COCO) with error correction for robustness.",
    category: "Computer Vision",
    status: "Completed",
    icon: "🔐"
  },
  {
    title: "CFD Simulation with CNN",
    description: "Developed and applied convolutional neural networks for computational fluid dynamics (CFD) simulations, enabling high-speed and accurate prediction of complex flow fields.",
    category: "Machine Learning",
    status: "Completed",
    icon: "🔬"
  },
  {
    title: "Cornell University MRI Alzheimer's Disease Project",
    description: "Contributed to research on MRI-based detection and analysis of Alzheimer's Disease, focusing on advanced imaging and machine learning techniques.",
    category: "Medical AI",
    status: "Ongoing",
    icon: "🧠"
  },
  {
    title: "Astrochemistry AI Model with SMILES",
    description: "Built AI models leveraging SMILES representations to predict and analyze astrochemical properties and reactions.",
    category: "Computational Chemistry",
    status: "Ongoing",
    icon: "⭐"
  },
  {
    title: "Simulation of Aurobindo Ashram on EnviMet and AI/ML Model",
    description: "Simulated the environmental dynamics of the Aurobindo Ashram using EnviMet and developed AI/ML models for environmental impact analysis.",
    category: "Environmental Science",
    status: "Ongoing",
    icon: "🌱"
  },
  {
    title: "Leather Defect Detection Paper under IEEE Publication Evaluation",
    description: "Authored a research paper focusing on automated detection of leather defects using machine learning techniques. Currently under IEEE publication evaluation.",
    category: "Computer Vision",
    status: "Under Review",
    icon: "📄"
  },
];

const categoryColors = {
  "Machine Learning": "bg-slate-900/40 border-[var(--color-teal)]/20 hover:border-[var(--color-teal)]/40",
  "Medical AI": "bg-slate-900/40 border-red-500/20 hover:border-red-500/40",
  "Computational Chemistry": "bg-slate-900/40 border-purple-500/20 hover:border-purple-500/40",
  "Environmental Science": "bg-slate-900/40 border-emerald-500/20 hover:border-emerald-500/40",
  "Computer Vision": "bg-slate-900/40 border-orange-500/20 hover:border-orange-500/40"
};

const statusColors = {
  "Completed": "bg-green-950/30 text-green-400 border-green-800/40",
  "Ongoing": "bg-blue-950/30 text-blue-400 border-blue-800/40",
  "Under Review": "bg-amber-950/30 text-amber-400 border-amber-800/40"
};

const ResearchSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] // cubic-bezier approximation of easeOut
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <section
        id="research"
        className="w-full h-[600px] bg-slate-900/40 backdrop-blur-lg rounded-xl border border-slate-800 shadow-lg overflow-hidden"
      >
        {/* Main Content Area - Fixed height to match Articles section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="h-full overflow-y-auto space-y-4 p-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
          aria-label="Research Projects List"
          tabIndex={0}
        >
          <AnimatePresence>
            {researchProjects.map((project, idx) => (
              <motion.article
                key={idx}
                variants={itemVariants}
                layout
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative overflow-hidden backdrop-blur-sm transition-all duration-300 p-4 rounded-xl border shadow-sm hover:shadow-md cursor-default ${categoryColors[project.category as keyof typeof categoryColors] || "bg-slate-900/40 border-slate-800"
                  }`}
              >
                {/* Left accent bar */}
                <motion.div
                  className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-gradient-to-b from-[var(--color-teal)] to-[var(--color-info)]"
                  animate={{
                    opacity: hoveredIndex === idx ? 1 : 0.85,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Content */}
                <div className="relative ml-3">
                  {/* Header with icon, title, and status */}
                  <div className="flex items-start gap-3 mb-3">
                    <motion.div
                      className="text-lg flex-shrink-0 mt-0.5"
                      animate={{
                        scale: hoveredIndex === idx ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.icon}
                    </motion.div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg font-semibold text-slate-100 group-hover:text-[var(--color-teal)] tracking-tight transition-colors duration-300 leading-tight">
                          {project.title}
                        </h3>
                        <motion.div
                          animate={{
                            x: hoveredIndex === idx ? 2 : 0,
                            opacity: hoveredIndex === idx ? 1 : 0.6
                          }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0"
                        >
                          <ChevronRight className="w-4 h-4 text-[var(--color-teal)]" />
                        </motion.div>
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-medium text-slate-400 bg-slate-800/50 px-2 py-0.5 rounded-full">
                          {project.category}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${statusColors[project.status as keyof typeof statusColors]}`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed select-text mb-3">
                    {project.description}
                  </p>

                  {/* Bottom action area */}
                  <motion.div
                    className="flex items-center justify-between pt-2 border-t border-white/5"
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: hoveredIndex === idx ? 1 : 0.7 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-1 text-slate-500">
                      <Clock className="w-3 h-3" />
                      <span className="text-xs">Research Project</span>
                    </div>

                    {project.status === "Under Review" && (
                      <motion.div
                        className="flex items-center gap-1 px-2 py-0.5 bg-[var(--color-teal)]/10 text-[var(--color-teal)] rounded-md border border-[var(--color-teal)]/30"
                        whileHover={{ scale: 1.02 }}
                      >
                        <Award className="w-3 h-3" />
                        <span className="text-xs font-medium">IEEE Review</span>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
};

export default ResearchSection;
