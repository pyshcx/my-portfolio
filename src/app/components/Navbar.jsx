"use client";

import { HiMail } from "react-icons/hi"; // Import mail icon from react-icons

const Navbar = () => {
  return (
    <nav className="bg-lidar-black text-lidar-white fixed w-full top-0 z-10 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold">Pranay Shah</h1>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6">
          {["Home", "About", "Experience", "Projects", "Contact"].map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`} className="hover:text-lidar-teal">
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Email Option */}
        <a
          href="mailto:pranayshah1908@gmail.com"
          className="flex items-center bg-lidar-teal text-black py-2 px-4 rounded-lg hover:bg-lidar-darkTeal transition"
        >
          <HiMail className="mr-2 text-xl" /> Email Me
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
