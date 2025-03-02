"use client";

import { useEffect, useState } from "react";
import { HiDocumentText } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const sections = ["home", "about", "experience", "projects", "education", "contact"];
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      
      if (isAtBottom) {
        setActiveSection("contact");
      } else {
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  const navItems = ["Home", "About", "Experience", "Projects", "Education", "Contact"];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-[rgba(30,61,88,0.85)] backdrop-blur-md shadow-lg py-2" 
            : "bg-[rgba(30,61,88,0.4)] backdrop-blur-sm py-4"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-4">
          <motion.h1 
            whileHover={{ scale: 1.05 }}
            className="text-xl md:text-2xl font-bold text-[#00BFA6] transition-all duration-300"
          >
            <a href="#home">Pranay Shah</a>
          </motion.h1>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.li key={item} className="relative" whileHover={{ y: -2 }}>
                <a 
                  href={`#${item.toLowerCase()}`} 
                  className={`transition-all duration-300 hover:text-[#00BFA6] ${
                    activeSection === item.toLowerCase() ? "text-[#00BFA6]" : "text-[#F5F5F5]"
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <motion.span 
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#00BFA6] rounded-full"
                    />
                  )}
                </a>
              </motion.li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://drive.google.com/file/d/1Co3ZfjDaFMoMStNIHVbYA8njctI4YOCa/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-4 bg-[#00BFA6] text-white py-1.5 px-3 rounded-lg hover:bg-[#82E9F5] hover:text-[#333333] transition-all duration-300"
            >
              <HiDocumentText className="mr-1 text-lg inline" /> CV
            </motion.a>
            <motion.button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#F5F5F5] bg-[rgba(0,191,166,0.2)] p-2 rounded-lg backdrop-blur-sm focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </motion.button>
          </div>

          {/* Desktop Resume Button */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://drive.google.com/file/d/1Co3ZfjDaFMoMStNIHVbYA8njctI4YOCa/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center bg-[#00BFA6] text-white py-2 px-4 rounded-lg hover:bg-[#82E9F5] hover:text-[#333333] transition-all duration-300"
          >
            <HiDocumentText className="mr-2 text-xl" /> Resume
          </motion.a>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-[rgba(30,61,88,0.95)] backdrop-blur-md border-t border-[#00BFA6]/10"
            >
              <ul className="flex flex-col items-center py-4">
                {navItems.map((item) => (
                  <motion.li 
                    key={item} 
                    className="py-3 w-full text-center"
                    whileHover={{ backgroundColor: "rgba(0, 191, 166, 0.1)" }}
                  >
                    <a 
                      href={`#${item.toLowerCase()}`} 
                      className={`block transition-all duration-300 hover:text-[#00BFA6] ${
                        activeSection === item.toLowerCase() ? "text-[#00BFA6]" : "text-[#F5F5F5]"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      
      {/* Overlay when mobile menu is open */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
