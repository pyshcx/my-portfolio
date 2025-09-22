"use client";

import { motion } from 'framer-motion';
import { Award, Trophy, Star, Medal, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import SectionWrapper from './SectionWrapper';

const achievements = [
  {
    id: 1,
    title: "Formula Student Germany 2024",
    category: "Competition",
    description: "Selected among Top 35 global teams at Formula Student Germany 2024 Autonomous Challenge. Led the Path Planning team for Team Ojas Racing, developing autonomous navigation algorithms and YOLO-based object detection systems.",
    date: "2024",
    image: "public/PHOTO-2025-09-23-00-24-48.jpg",
    icon: Trophy,
    color: "from-[#1E3D58] to-[#3A6EA5]",
    highlights: ["Top 35 globally", "Autonomous Challenge", "Team Leadership"]
  },
  {
    id: 2,
    title: "Machine Learning Specialization",
    category: "Certification",
    description: "Completed comprehensive Machine Learning Specialization from DeepLearning.AI & Coursera, mastering supervised learning, unsupervised learning, and advanced ML techniques including neural networks and deep learning.",
    date: "2024",
    image: "/images/achievements/ml-certification.jpg",
    icon: Award,
    color: "from-[#3A6EA5] to-[#00BFA6]",
    highlights: ["DeepLearning.AI", "Coursera", "Advanced ML Techniques"]
  },
  {
    id: 3,
    title: "Odoo Hackathon Finalist",
    category: "Hackathon",
    description: "Reached the finals of Odoo Hackathon 2024, showcasing innovative solutions and technical excellence in enterprise software development and business automation.",
    date: "2024",
    image: "/images/achievements/odoo-hackathon.jpg",
    icon: Star,
    color: "from-[#00BFA6] to-[#82E9F5]",
    highlights: ["Finalist Position", "Enterprise Solutions", "Innovation"]
  },
  {
    id: 4,
    title: "Top 10% Recognition - Alfaleus Tech",
    category: "Internship",
    description: "Achieved Top 10% recognition at Alfaleus Tech Internship Bootcamp 2025, demonstrating exceptional performance in advanced technology projects and collaborative development.",
    date: "2025",
    image: "/images/achievements/alfaleus-recognition.jpg",
    icon: Medal,
    color: "from-[#1E3D58] via-[#3A6EA5] to-[#00BFA6]",
    highlights: ["Top 10%", "Bootcamp Excellence", "Advanced Tech"]
  },
  {
    id: 5,
    title: "Generative AI using IBM Watsonx",
    category: "Certification",
    description: "Completed advanced certification in Generative AI using IBM Watsonx platform, gaining expertise in large language models, prompt engineering, and enterprise AI solutions.",
    date: "2025",
    image: "/images/achievements/ibm-watsonx.jpg",
    icon: Award,
    color: "from-[#3A6EA5] to-[#00BFA6]",
    highlights: ["IBM Career Education", "Generative AI", "Enterprise Solutions"]
  }
];

const Achievements = () => {
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <SectionWrapper id="achievements">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-full"
      >
        {/* Section Header - Consistent with other sections */}
        <h2 className="section-title">
          Achievements
        </h2>
        
        {/* Section Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="section-text text-center max-w-3xl mx-auto mb-12"
        >
          Celebrating milestones in my journey through technology, research, and innovation
        </motion.p>

        {/* Achievements Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {achievements.map((achievement) => {
            const IconComponent = achievement.icon;
            return (
              <motion.div
                key={achievement.id}
                variants={itemVariants}
                className="group relative"
              >
                <div 
                  className="glass-card h-full flex flex-col cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  onClick={() => setSelectedAchievement(achievement)}
                >
                  {/* Achievement Header with Icon */}
                  <div className="relative h-32 md:h-40 overflow-hidden rounded-t-xl mb-4">
                    <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-90`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <IconComponent className="w-12 h-12 md:w-16 md:h-16 text-white drop-shadow-lg" />
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs md:text-sm font-medium border border-white/20">
                        {achievement.category}
                      </span>
                    </div>
                    
                    {/* Date Badge */}
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-white/90 text-[#333333] px-2 py-1 rounded-full text-xs font-medium">
                        {achievement.date}
                      </span>
                    </div>
                  </div>

                  {/* Achievement Content */}
                  <div className="flex-1 flex flex-col px-2">
                    <h3 className="text-lg md:text-xl font-bold text-[#333333] mb-3 group-hover:text-[#00BFA6] transition-colors duration-300">
                      {achievement.title}
                    </h3>

                    <p className="section-text text-sm md:text-base mb-4 flex-1 leading-relaxed">
                      {achievement.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {achievement.highlights.slice(0, 2).map((highlight, index) => (
                        <span
                          key={index}
                          className="bg-[#F5F5F5] text-[#3A6EA5] px-3 py-1 rounded-full text-xs font-medium shadow-sm"
                        >
                          {highlight}
                        </span>
                      ))}
                      {achievement.highlights.length > 2 && (
                        <span className="text-[#00BFA6] text-xs font-medium px-2 py-1">
                          +{achievement.highlights.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Click to view more */}
                  <div className="mt-4 pt-4 border-t border-[#00BFA6]/10">
                    <div className="flex items-center justify-center text-[#00BFA6] text-sm font-medium group-hover:text-[#82E9F5] transition-colors">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Click to view details
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Modal for detailed view */}
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative">
                <div className={`h-48 md:h-64 bg-gradient-to-br ${selectedAchievement.color} flex items-center justify-center rounded-t-2xl`}>
                  <selectedAchievement.icon className="w-16 h-16 md:w-20 md:h-20 text-white drop-shadow-lg" />
                </div>
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors text-xl font-light"
                >
                  ×
                </button>
              </div>
              
              {/* Modal Content */}
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#333333]">
                    {selectedAchievement.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="bg-[#00BFA6] text-white px-4 py-2 rounded-full text-sm font-medium">
                      {selectedAchievement.category}
                    </span>
                    <span className="text-[#333333] font-medium">
                      {selectedAchievement.date}
                    </span>
                  </div>
                </div>
                
                <p className="section-text text-base md:text-lg leading-relaxed mb-6">
                  {selectedAchievement.description}
                </p>
                
                {/* All Highlights in Modal */}
                <div className="border-t border-[#00BFA6]/10 pt-6">
                  <h4 className="font-semibold text-[#333333] mb-4 text-lg">Key Highlights:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedAchievement.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="bg-[#F5F5F5] text-[#3A6EA5] px-4 py-3 rounded-lg flex items-center font-medium"
                      >
                        <div className="w-2 h-2 bg-[#00BFA6] rounded-full mr-3 flex-shrink-0"></div>
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </SectionWrapper>
  );
};

export default Achievements;
