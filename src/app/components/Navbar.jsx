"use client";

import { useEffect, useState, useRef } from "react";
import { HiDocumentText } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
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

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle scroll events with better mobile optimization
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      // Check if scrolled for navbar background
      const scrollY = window.scrollY || window.pageYOffset;
      setScrolled(scrollY > 20);

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

        if (sectionElements.length === 0) return;

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
        const documentHeight = Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
        );
        
        const isAtBottom = window.innerHeight + scrollY >= documentHeight - 100;
        
        if (isAtBottom) {
          setActiveSection("contact");
        } else if (maxVisibleSection) {
          setActiveSection(maxVisibleSection);
        }
      }, 100); // 100ms debounce
    };

    // Run once on mount to set initial active section
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isMounted]);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    if (!isMounted) return;

    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen, isMounted]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [mobileMenuOpen]);

  // Function to handle navigation item clicks with smooth scrolling
  const handleNavClick = (id, e) => {
    e?.preventDefault();
    setActiveSection(id);
    setMobileMenuOpen(false);
    
    // Smooth scroll to section
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // Don't render until mounted to avoid hydration issues
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-[rgba(30,61,88,0.95)] backdrop-blur-md shadow-lg py-2" 
            : "bg-[rgba(30,61,88,0.7)] backdrop-blur-sm py-3 md:py-4"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
          <motion.h1 
            whileHover={{ scale: 1.05 }}
            className="text-lg sm:text-xl md:text-2xl font-bold text-[#00BFA6] transition-all duration-300 z-50"
          >
            <a 
              href="#home" 
              onClick={(e) => handleNavClick("home", e)}
              className="block"
            >
              Pranay Shah
            </a>
          </motion.h1>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <motion.li key={item.name} className="relative" whileHover={{ y: -2 }}>
                <a 
                  href={`#${item.id}`} 
                  className={`text-sm lg:text-base transition-all duration-300 hover:text-[#00BFA6] ${
                    activeSection === item.id ? "text-[#00BFA6]" : "text-[#F5F5F5]"
                  }`}
                  onClick={(e) => handleNavClick(item.id, e)}
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

          <div className="flex items-center space-x-3">
            {/* Desktop Resume Button */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://drive.google.com/file/d/1Co3ZfjDaFMoMStNIHVbYA8njctI4YOCa/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center bg-[#00BFA6] text-white py-2 px-3 lg:px-4 rounded-lg hover:bg-[#82E9F5] hover:text-[#333333] transition-all duration-300 text-sm lg:text-base"
            >
              <HiDocumentText className="mr-1 lg:mr-2 text-lg lg:text-xl" /> 
              Resume
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#F5F5F5] bg-[rgba(0,191,166,0.2)] p-2.5 rounded-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#00BFA6] z-50"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-[rgba(30,61,88,0.98)] backdrop-blur-md border-t border-[#00BFA6]/20 absolute top-full left-0 w-full"
            >
              <ul className="flex flex-col py-4">
                {navItems.map((item, index) => (
                  <motion.li 
                    key={item.name} 
                    className="px-6 py-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ backgroundColor: "rgba(0, 191, 166, 0.1)" }}
                  >
                    <a 
                      href={`#${item.id}`} 
                      className={`block text-base transition-all duration-300 hover:text-[#00BFA6] ${
                        activeSection === item.id ? "text-[#00BFA6] font-semibold" : "text-[#F5F5F5]"
                      }`}
                      onClick={(e) => handleNavClick(item.id, e)}
                    >
                      {item.name}
                    </a>
                  </motion.li>
                ))}
                <motion.li 
                  className="px-6 py-3 pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                >
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="https://drive.google.com/file/d/1Co3ZfjDaFMoMStNIHVbYA8njctI4YOCa/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-[#00BFA6] text-white py-3 px-4 rounded-lg hover:bg-[#82E9F5] hover:text-[#333333] transition-all duration-300 text-base font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <HiDocumentText className="mr-2 text-xl" /> 
                    Resume
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
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
