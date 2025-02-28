"use client";

import { useEffect, useState } from "react";
import { HiDocumentText } from "react-icons/hi";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Shrink navbar on scroll
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Update active section based on scroll position
      const sections = ["home", "about", "experience", "projects", "education", "contact"];
      
      // Check if we're near the bottom of the page for contact section
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      
      if (isAtBottom) {
        setActiveSection("contact");
      } else {
        // Otherwise check each section
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

  return (
    <nav 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-lidar-black bg-opacity-70 backdrop-blur-md shadow-lg py-2" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo with animation */}
        <h1 className="text-2xl font-bold text-lidar-teal transition-all duration-300 hover:scale-105">
          <span className="text-white">Pranay</span> Shah
        </h1>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6">
          {["Home", "About", "Experience", "Projects", "Education", "Contact"].map((item) => (
            <li key={item} className="relative">
              <a 
                href={`#${item.toLowerCase()}`} 
                className={`transition-all duration-300 hover:text-lidar-teal ${
                  activeSection === item.toLowerCase() ? "text-lidar-teal" : "text-lidar-white"
                }`}
              >
                {item}
                {activeSection === item.toLowerCase() && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-lidar-teal rounded-full transform transition-all duration-300"></span>
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {/* Resume Button */}
          <a
            href="https://drive.google.com/file/d/1Co3ZfjDaFMoMStNIHVbYA8njctI4YOCa/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-transparent border border-lidar-teal text-lidar-teal py-2 px-4 rounded-lg hover:bg-lidar-teal hover:text-black transition-all duration-300"
          >
            <HiDocumentText className="mr-2 text-xl" /> Resume
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
