"use client";

import { FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa"; // Import icons for LinkedIn, Instagram, and Twitter

const Contact = () => (
  <section
    id="contact"
    className="py-16 bg-cover bg-center relative"
    style={{
      backgroundImage: "url('//lidar-bg.jpg')", // Ensure this image is saved in the public/images folder
    }}
  >
    {/* Overlay for better contrast */}
    <div className="absolute inset-0 bg-black bg-opacity-70"></div>

    {/* Content */}
    <div className="relative z-10 container mx-auto max-w-lg text-center">
      <h2 className="text-4xl font-bold text-lidar-teal mb-6">Get In Touch</h2>
      <p className="text-lg text-gray-300 mb-8">
        Feel free to reach out via email or connect with me on social media.
      </p>

      {/* Contact Buttons */}
      <div className="flex justify-center space-x-4">
        {/* Email Button */}
        <a
          href="mailto:pranayshah1908@gmail.com"
          className="bg-lidar-teal hover:bg-lidar-darkTeal text-black py-3 px-6 rounded-lg transition font-bold"
        >
          Email Me
        </a>

        {/* LinkedIn Button */}
        <a
          href="https://www.linkedin.com/in/pranayshah19/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-lidar-teal hover:bg-lidar-darkTeal text-black py-3 px-6 rounded-lg transition font-bold"
        >
          <FaLinkedin className="mr-2" /> LinkedIn
        </a>

        {/* Instagram Button */}
        <a
          href="https://www.instagram.com/pranayshah19/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-lidar-teal hover:bg-lidar-darkTeal text-black py-3 px-6 rounded-lg transition font-bold"
        >
          <FaInstagram className="mr-2" /> Instagram
        </a>

        {/* Twitter Button */}
        <a
          href="https://twitter.com/pyshcx/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-lidar-teal hover:bg-lidar-darkTeal text-black py-3 px-6 rounded-lg transition font-bold"
        >
          <FaTwitter className="mr-2" /> Twitter
        </a>
      </div>
    </div>
  </section>
);

export default Contact;
