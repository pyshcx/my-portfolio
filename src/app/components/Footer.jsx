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
    <footer className="bg-slate-950 border-t border-slate-900 py-10 md:py-14">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left side - Name/Brand */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-slate-100 text-xl font-bold">Pranay Shah</h3>
            <p className="text-slate-400 text-sm mt-1">Computer Science Engineer</p>
          </div>

          {/* Right side - Social Links */}
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900 p-3 rounded-full border border-slate-800 shadow-md group"
                whileHover={{
                  scale: 1.15,
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderColor: "var(--color-teal)"
                }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <span className="text-slate-300 group-hover:text-[var(--color-teal)] text-xl transition-colors">
                  {social.icon}
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-teal)]/20 to-transparent my-6"></div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <p className="text-slate-500 text-sm mb-4 md:mb-0">
            © 2026 Pranay Shah. All rights reserved.
          </p>

          {/* Made With Love */}
          <p className="text-slate-500 text-sm flex items-center">
            Made with <FaHeart className="text-[var(--color-teal)] mx-2 animate-pulse" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
