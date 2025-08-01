import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Award, Clock } from 'lucide-react';

const researchProjects = [
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
  "Machine Learning": "from-[#00BFA6]/30 to-[#008D7B]/30 border-[#00BFA6]/50",
  "Medical AI": "from-red-500/30 to-pink-500/30 border-red-400/50",
  "Computational Chemistry": "from-purple-500/30 to-violet-500/30 border-purple-400/50",
  "Environmental Science": "from-green-500/30 to-emerald-500/30 border-green-400/50",
  "Computer Vision": "from-orange-500/30 to-amber-500/30 border-orange-400/50"
};

const statusColors = {
  "Completed": "bg-green-100/80 text-green-700 border-green-300/60",
  "Ongoing": "bg-blue-100/80 text-blue-700 border-blue-300/60",
  "Under Review": "bg-amber-100/80 text-amber-700 border-amber-300/60"
};

const ResearchSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <section 
        id="research" 
        className="w-full h-[600px] bg-gradient-to-tr from-white/10 via-white/5 to-white/20 backdrop-blur-lg rounded-xl border border-[#00BFA6]/30 shadow-lg overflow-hidden"
      >
        {/* Main Content Area - Fixed height to match Articles section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="h-full overflow-y-auto space-y-4 p-6 scrollbar-thin scrollbar-thumb-[#00BFA6]/60 scrollbar-track-transparent"
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
                className={`group relative overflow-hidden backdrop-blur-sm transition-all duration-300 p-4 rounded-xl border shadow-sm hover:shadow-md cursor-default ${
                  categoryColors[project.category as keyof typeof categoryColors] || "from-white/30 to-white/40 border-[#00BFA6]/40"
                }`}
              >
                {/* Left accent bar */}
                <motion.div
                  className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-gradient-to-b from-[#00BFA6] to-[#008D7B]"
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
                        <h3 className="text-lg font-semibold text-[#00474F] group-hover:text-[#006D66] tracking-tight transition-colors duration-300 leading-tight">
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
                          <ChevronRight className="w-4 h-4 text-[#00BFA6]" />
                        </motion.div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-medium text-[#00474F]/70 bg-white/40 px-2 py-0.5 rounded-full">
                          {project.category}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${statusColors[project.status as keyof typeof statusColors]}`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-900 text-sm leading-relaxed select-text mb-3">
                    {project.description}
                  </p>

                  {/* Bottom action area */}
                  <motion.div
                    className="flex items-center justify-between pt-2 border-t border-[#00BFA6]/20"
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: hoveredIndex === idx ? 1 : 0.7 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-1 text-[#00474F]/60">
                      <Clock className="w-3 h-3" />
                      <span className="text-xs">Research Project</span>
                    </div>
                    
                    {project.status === "Under Review" && (
                      <motion.div
                        className="flex items-center gap-1 px-2 py-0.5 bg-[#00BFA6]/10 text-[#00474F] rounded-md border border-[#00BFA6]/30"
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
