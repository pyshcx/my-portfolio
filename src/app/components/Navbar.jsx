"use client";

import { useEffect, useState, useRef } from "react";
import { HiDocumentText } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollTimeoutRef = useRef(null);

  // Navigation items with their corresponding section IDs
  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Experience", id: "experience" },
    { name: "Projects", id: "projects" },
    { name: "Education", id: "education" },
    { name: "Articles & Research", id: "articles-research" },
    { name: "Contact", id: "contact" }
  ];

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled for navbar background
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Use debouncing to avoid excessive calculations
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        // Get all section elements
        const sectionElements = navItems.map(item => ({
          id: item.id,
          element: document.getElementById(item.id)
        })).filter(item => item.element);

        // Calculate which section is most visible
        const viewportHeight = window.innerHeight;
        let maxVisibleSection = null;
        let maxVisibleRatio = 0;

        sectionElements.forEach(({ id, element }) => {
          const rect = element.getBoundingClientRect();
          
          // Calculate how much of the element is visible
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(viewportHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          
          // Calculate ratio of visible part to viewport
          const visibleRatio = visibleHeight / viewportHeight;
          
          // Apply special weighting for articles-research section
          const weight = id === "articles-research" ? 1.2 : 1;
          const weightedRatio = visibleRatio * weight;
          
          if (weightedRatio > maxVisibleRatio) {
            maxVisibleRatio = weightedRatio;
            maxVisibleSection = id;
          }
        });

        // Special case for bottom of page
        const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
        if (isAtBottom) {
          setActiveSection("contact");
        } else if (maxVisibleSection) {
          setActiveSection(maxVisibleSection);
        }
      }, 100); // 100ms debounce
    };

    // Run once on mount to set initial active section
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
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

  // Function to handle navigation item clicks
  const handleNavClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

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
            <a href="#home" onClick={() => handleNavClick("home")}>Pranay Shah</a>
          </motion.h1>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.li key={item.name} className="relative" whileHover={{ y: -2 }}>
                <a 
                  href={`#${item.id}`} 
                  className={`transition-all duration-300 hover:text-[#00BFA6] ${
                    activeSection === item.id ? "text-[#00BFA6]" : "text-[#F5F5F5]"
                  }`}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.name}
                  {activeSection === item.id && (
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
                    key={item.name} 
                    className="py-3 w-full text-center"
                    whileHover={{ backgroundColor: "rgba(0, 191, 166, 0.1)" }}
                  >
                    <a 
                      href={`#${item.id}`} 
                      className={`block transition-all duration-300 hover:text-[#00BFA6] ${
                        activeSection === item.id ? "text-[#00BFA6]" : "text-[#F5F5F5]"
                      }`}
                      onClick={() => handleNavClick(item.id)}
                    >
                      {item.name}
                    </a>
                  </motion.li>
                ))}
                <motion.li className="py-3 w-full text-center">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://drive.google.com/file/d/1Co3ZfjDaFMoMStNIHVbYA8njctI4YOCa/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-[#00BFA6] text-white py-2 px-4 rounded-lg hover:bg-[#82E9F5] hover:text-[#333333] transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <HiDocumentText className="mr-2 text-xl" /> Resume
                  </motion.a>
                </motion.li>
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
