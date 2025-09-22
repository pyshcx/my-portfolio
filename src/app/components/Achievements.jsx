"use client";

import { motion } from 'framer-motion';
import { Award, Trophy, Star, Medal } from 'lucide-react';
import { useState } from 'react';

const achievements = [
  {
    id: 1,
    title: "Formula Student Germany 2024",
    category: "Competition",
    description: "Selected among Top 35 global teams at Formula Student Germany 2024 Autonomous Challenge. Led the Path Planning team for Team Ojas Racing, developing autonomous navigation algorithms and YOLO-based object detection systems.",
    date: "2024",
    image: "/images/achievements/formula-student-2024.jpg", // Add your image path
    icon: Trophy,
    color: "from-yellow-400 to-orange-500",
    highlights: ["Top 35 globally", "Autonomous Challenge", "Team Leadership"]
  },
  {
    id: 2,
    title: "Machine Learning Specialization",
    category: "Certification",
    description: "Completed comprehensive Machine Learning Specialization from DeepLearning.AI & Coursera, mastering supervised learning, unsupervised learning, and advanced ML techniques including neural networks and deep learning.",
    date: "2024",
    image: "/images/achievements/ml-certification.jpg", // Add your image path
    icon: Award,
    color: "from-blue-400 to-purple-500",
    highlights: ["DeepLearning.AI", "Coursera", "Advanced ML Techniques"]
  },
  {
    id: 3,
    title: "Odoo Hackathon Finalist",
    category: "Hackathon",
    description: "Reached the finals of Odoo Hackathon 2024, showcasing innovative solutions and technical excellence in enterprise software development and business automation.",
    date: "2024",
    image: "/images/achievements/odoo-hackathon.jpg", // Add your image path
    icon: Star,
    color: "from-green-400 to-teal-500",
    highlights: ["Finalist Position", "Enterprise Solutions", "Innovation"]
  },
  {
    id: 4,
    title: "Top 10% Recognition - Alfaleus Tech",
    category: "Internship",
    description: "Achieved Top 10% recognition at Alfaleus Tech Internship Bootcamp 2025, demonstrating exceptional performance in advanced technology projects and collaborative development.",
    date: "2025",
    image: "/images/achievements/alfaleus-recognition.jpg", // Add your image path
    icon: Medal,
    color: "from-purple-400 to-pink-500",
    highlights: ["Top 10%", "Bootcamp Excellence", "Advanced Tech"]
  }
];

const Achievements = () => {
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="achievements" className="py-20 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            My Achievements
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Celebrating milestones in my journey through technology, research, and innovation
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
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
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer transform hover:-translate-y-2"
                  onClick={() => setSelectedAchievement(achievement)}
                >
                  {/* Achievement Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-90`} />
                    {/* Placeholder for image - replace with actual image when available */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <IconComponent className="w-16 h-16 text-white" />
                    </div>
                    {/* Uncomment below when you add actual images */}
                    {/* <img 
                      src={achievement.image} 
                      alt={achievement.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <IconComponent className="w-16 h-16 text-white" />
                    </div> */}
                    
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                        {achievement.category}
                      </span>
                    </div>
                  </div>

                  {/* Achievement Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {achievement.title}
                      </h3>
                      <span className="text-sm text-gray-500 font-medium">
                        {achievement.date}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {achievement.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {achievement.highlights.map((highlight, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {highlight}
                        </span>
                      ))}
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
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className={`h-64 bg-gradient-to-br ${selectedAchievement.color} flex items-center justify-center`}>
                  <selectedAchievement.icon className="w-20 h-20 text-white" />
                </div>
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {selectedAchievement.title}
                  </h3>
                  <span className="text-lg text-gray-500 font-medium">
                    {selectedAchievement.date}
                  </span>
                </div>
                
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {selectedAchievement.category}
                </span>
                
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {selectedAchievement.description}
                </p>
                
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Key Highlights:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAchievement.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Achievements;