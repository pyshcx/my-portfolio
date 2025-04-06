import React from 'react';
import { motion } from 'framer-motion';

const ResearchSection: React.FC = () => {
  return (
    <div className="p-6 bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-lg border border-[#00BFA6]/20 flex flex-col items-center justify-center h-full">
      {/* Animated Coming Soon Text */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-[#333333] mb-4"
      >
        Coming Soon
      </motion.h2>
      {/* Subtext */}
      <p className="text-gray-600 text-center text-lg">
        Exciting research content will be available here soon. Stay tuned!
      </p>
    </div>
  );
};

export default ResearchSection;
