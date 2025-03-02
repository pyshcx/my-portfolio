"use client";

import { FaGithub, FaLinkedin, FaMedium, FaInstagram, FaHeart } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    { icon: <FaGithub />, href: "https://github.com/pyshcx", label: "GitHub" },
    { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/pranayshah19/", label: "LinkedIn" },
    { icon: <FaXTwitter />, href: "https://twitter.com/pyshcx/", label: "Twitter" },
    { icon: <FaInstagram />, href: "https://www.instagram.com/pranayshah19/", label: "Instagram" },
    { icon: <FaMedium />, href: "https://medium.com/@pranayshah19", label: "Medium" },
  ];

  return (
    <footer className="bg-gradient-to-t from-[#1E3D58] via-[#3A6EA5] to-[#00BFA6] py-10 md:py-14">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left side - Name/Brand */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-[#333333] text-xl font-bold">Pranay Shah</h3>
            <p className="text-[#333333] text-sm mt-1">Computer Science Engineer</p>
          </div>
          
          {/* Right side - Social Links */}
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((social, index) => (
              <motion.a 
                key={index}
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white bg-opacity-10 p-3 rounded-full backdrop-blur-sm border border-[#00BFA6]/20 shadow-md"
                whileHover={{ 
                  scale: 1.15, 
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderColor: "#00BFA6" 
                }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <span className="text-[#333333] text-xl">
                  {social.icon}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#00BFA6]/30 to-transparent my-6"></div>
        
        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <p className="text-[#333333] text-sm mb-4 md:mb-0">
            © 2025 Pranay Shah. All rights reserved.
          </p>
          
          {/* Made With Love */}
          <p className="text-[#333333] text-sm flex items-center">
            Made with <FaHeart className="text-[#00BFA6] mx-2 animate-pulse" /> 
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
