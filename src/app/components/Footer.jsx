"use client";

import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-lidar-black py-8 text-center">
      <div className="container mx-auto px-4">
        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-6">
          <a 
            href="https://github.com/pyshcx" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-lidar-teal transition-colors duration-300 text-xl"
          >
            <FaGithub />
          </a>
          <a 
            href="https://www.linkedin.com/in/pranayshah19/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-lidar-teal transition-colors duration-300 text-xl"
          >
            <FaLinkedin />
          </a>
          <a 
            href="https://twitter.com/pyshcx/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-lidar-teal transition-colors duration-300 text-xl"
          >
            <FaTwitter />
          </a>
          <a 
            href="https://www.instagram.com/pranayshah19/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-lidar-teal transition-colors duration-300 text-xl"
          >
            <FaInstagram />
          </a>
        </div>
        
        {/* Copyright */}
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Pranay Shah. All rights reserved.
        </p>
        
        {/* Made With Love */}
        <p className="text-gray-500 text-sm mt-2 flex items-center justify-center">
          Made with <FaHeart className="text-lidar-teal mx-1" />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
