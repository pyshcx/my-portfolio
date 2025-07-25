import React from 'react';
import { motion } from 'framer-motion';

const researchProjects = [
  {
    title: "CFD Simulation with CNN",
    description:
      "Developed and applied convolutional neural networks for computational fluid dynamics (CFD) simulations, enabling high-speed and accurate prediction of complex flow fields.",
  },
  {
    title: "Cornell University MRI Alzheimer's Disease Project",
    description:
      "Contributed to research on MRI-based detection and analysis of Alzheimer's Disease, focusing on advanced imaging and machine learning techniques.",
  },
  {
    title: "Astrochemistry AI Model with SMILES",
    description:
      "Built AI models leveraging SMILES representations to predict and analyze astrochemical properties and reactions.",
  },
  {
    title: "Simulation of Aurobindo Ashram on EnviMet and AI/ML Model",
    description:
      "Simulated the environmental dynamics of the Aurobindo Ashram using EnviMet and developed AI/ML models for environmental impact analysis.",
  },
  {
    title: "Leather Defect Detection Paper under IEEE Publication Evaluation",
    description:
      "Authored a research paper focusing on automated detection of leather defects using machine learning techniques. Currently under IEEE publication evaluation.",
  },
];

const ResearchSection = () => {
  return (
    <section className="p-8 max-w-5xl mx-auto bg-gradient-to-tr from-white/10 via-white/5 to-white/20 backdrop-blur-lg rounded-2xl border border-[#00BFA6]/30 shadow-xl">
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-extrabold text-[#0F172A] mb-10 text-center tracking-wide"
      >
        Research Projects & Publications
      </motion.h2>

      {/* Scrollable container */}
      <div
        className="max-h-[520px] overflow-y-auto space-y-8 pr-6 scrollbar-thin scrollbar-thumb-[#00BFA6]/60 scrollbar-track-transparent"
        aria-label="Research Projects List"
        tabIndex={0}
      >
        {researchProjects.map((project, idx) => (
          <motion.article
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * idx, duration: 0.5, ease: 'easeOut' }}
            className="group relative bg-white/30 hover:bg-white/40 transition-colors duration-300 p-6 rounded-xl border border-[#00BFA6]/40 shadow-md hover:shadow-lg cursor-default focus-within:ring-2 focus-within:ring-[#00BFA6]/70 outline-none"
            tabIndex={-1}
          >
            <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-gradient-to-b from-[#00BFA6] to-[#008D7B] opacity-85 group-hover:opacity-100 transition-opacity duration-300"></div>
            <h3 className="text-2xl font-semibold text-[#00474F] group-hover:text-[#006D66] mb-3 tracking-tight">
              {project.title}
            </h3>
            <p className="text-gray-900 text-lg leading-relaxed select-text">{project.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default ResearchSection;
