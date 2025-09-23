"use client";

import { motion } from 'framer-motion';
import { Award, Trophy, Star, Medal, ExternalLink, Car } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import SectionWrapper from './SectionWrapper';

const achievements = [
  {
    id: 1,
    title: "Best AI/ML Model Award - VIT Engineers Day 2025",
    category: "Research Award",
    description: "Won the Best AI/ML Model award at Vellore Institute of Technology Engineers Day 2025 for the project 'Unlocking the Cosmos: AI for Astrochemical Reaction Networks.' Developed an innovative AI model to understand and predict chemistry happening in deep space, finding patterns in cosmic data.",
    date: "2025",
    image: "/img_astro_award.jpg",
    icon: Trophy,
    color: "from-[#1E3D58] to-[#3A6EA5]",
    highlights: [
      "Best AI/ML Model Award",
      "VIT Engineers Day 2025", 
      "Astrochemical Research",
      "Team Leadership",
      "Chancellor Recognition",
      "Deep Space Chemistry AI"
    ]
  },
  {
    id: 2,
    title: "Formula Student Germany 2024 - Team Ojas Racing",
    category: "International Competition",
    description: "Participated in the prestigious Formula Student Germany 2024 at Hockenheimring as an autonomous systems member of Team Ojas Racing from VIT. Engaged in designing and building single-seat formula race cars, focusing on autonomous systems and cutting-edge automotive technologies.",
    date: "2024",
    image: "/formula_student_germany.jpg", // You can add your FSG image here
    icon: Car,
    color: "from-[#3A6EA5] to-[#00BFA6]",
    highlights: [
      "Hockenheimring Racing Circuit",
      "Autonomous Systems Specialist",
      "International Competition",
      "Industry Networking",
      "Team Ojas Racing",
      "VIT University"
    ]
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
        {/* Section Header */}
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

        {/* Achievements Grid - Now supports multiple achievements */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
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
                  {/* Achievement Header with Image */}
                  <div className="relative h-48 overflow-hidden rounded-t-xl mb-4">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      {achievement.image ? (
                        <Image
                          src={achievement.image}
                          alt={achievement.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${achievement.color}`} />
                      )}
                      {/* Light overlay for better badge readability */}
                      <div className="absolute inset-0 bg-black/20" />
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-white/90 backdrop-blur-sm text-[#333333] px-3 py-1 rounded-full text-sm font-medium border border-white/20">
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
                    <h3 className="text-xl font-bold text-[#333333] mb-3 group-hover:text-[#00BFA6] transition-colors duration-300">
                      {achievement.title}
                    </h3>

                    <p className="section-text text-base mb-4 flex-1 leading-relaxed">
                      {achievement.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {achievement.highlights.slice(0, 3).map((highlight, index) => (
                        <span
                          key={index}
                          className="bg-[#F5F5F5] text-[#3A6EA5] px-3 py-1 rounded-full text-xs font-medium shadow-sm"
                        >
                          {highlight}
                        </span>
                      ))}
                      {achievement.highlights.length > 3 && (
                        <span className="text-[#00BFA6] text-xs font-medium px-2 py-1">
                          +{achievement.highlights.length - 3} more
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
              {/* Modal Header with Image */}
              <div className="relative">
                <div className="h-64 overflow-hidden rounded-t-2xl">
                  {selectedAchievement.image ? (
                    <Image
                      src={selectedAchievement.image}
                      alt={selectedAchievement.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${selectedAchievement.color}`} />
                  )}
                  {/* Light overlay for close button visibility */}
                  <div className="absolute inset-0 bg-black/10" />
                </div>
                
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#333333] w-10 h-10 rounded-full flex items-center justify-center hover:bg-white transition-colors text-xl font-light shadow-lg"
                >
                  ×
                </button>
              </div>
              
              {/* Modal Content */}
              <div className="p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                  <h3 className="text-3xl font-bold text-[#333333]">
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
                
                {/* Dynamic modal content based on achievement */}
                {selectedAchievement.id === 1 ? (
                  <>
                    <p className="section-text text-lg leading-relaxed mb-6">
                      This groundbreaking project focused on developing AI models to understand astrochemical reaction networks in deep space. Working with an incredible team, we created innovative algorithms that could identify patterns in cosmic data and predict chemical reactions occurring in the vast universe.
                    </p>

                    <div className="bg-[#F5F5F5] p-6 rounded-xl mb-6">
                      <h4 className="font-semibold text-[#333333] mb-3 text-lg">Project Details:</h4>
                      <p className="section-text">
                        The recognition came from Chancellor Dr. G. Viswanathan and Dean Dr. Jaisankar N at VIT's prestigious Engineers Day celebration. This achievement represents months of dedicated research into the intersection of artificial intelligence and space chemistry, pushing the boundaries of what's possible in computational astrophysics.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="section-text text-lg leading-relaxed mb-6">
                      An incredible journey at the prestigious Hockenheimring racing circuit in Germany, where I contributed to Team Ojas Racing's autonomous systems development. This global competition challenged us to design and build single-seat formula race cars while focusing on the complete package of design, performance, financial planning, and market strategy.
                    </p>

                    <div className="bg-[#F5F5F5] p-6 rounded-xl mb-6">
                      <h4 className="font-semibold text-[#333333] mb-3 text-lg">Experience Highlights:</h4>
                      <p className="section-text mb-4">
                        <strong>Technical Growth:</strong> Gained hands-on experience in autonomous systems, tackling real-world engineering challenges and diving deep into cutting-edge automotive technologies.
                      </p>
                      <p className="section-text mb-4">
                        <strong>Industry Networking:</strong> Connected with brilliant students from universities worldwide and industry leaders from renowned companies like Porsche, Bosch, Tesla, and Mercedes.
                      </p>
                      <p className="section-text">
                        <strong>Learning & Feedback:</strong> Participated in insightful review sessions with judges, receiving valuable feedback and guidance for future projects and career development.
                      </p>
                    </div>
                  </>
                )}
                
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
