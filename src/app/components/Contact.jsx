"use client";

import { FaPhone, FaEnvelope } from "react-icons/fa"; // Import phone and email icons

const Contact = () => (
  <section
    id="contact"
    className="py-16 bg-cover bg-center relative"
    style={{
      backgroundImage: "url('/images/lidar-bg.jpg')", // Ensure this image is saved in the public/images folder
    }}
  >
    {/* Overlay for better contrast */}
    <div className="absolute inset-0 bg-black bg-opacity-70"></div>

    {/* Content */}
    <div className="relative z-10 container mx-auto max-w-lg text-center">
      <h2 className="text-4xl font-bold text-lidar-teal mb-6">Contact Me</h2>
      <p className="text-lg text-gray-300 mb-8">
        Feel free to reach out directly via phone or email.
      </p>

      {/* Contact Icons */}
      <div className="flex justify-center space-x-8">
        {/* Email Icon */}
        <a
          href="mailto:pranayshah1908@gmail.com"
          className="bg-lidar-teal hover:bg-lidar-darkTeal text-black p-4 rounded-full transition transform hover:scale-110"
          title="Send Email"
        >
          <FaEnvelope className="text-2xl" />
        </a>

        {/* Phone Icon */}
        <a
          href="tel:+918866092052" // Replace with your actual phone number
          className="bg-lidar-teal hover:bg-lidar-darkTeal text-black p-4 rounded-full transition transform hover:scale-110"
          title="Call Me"
        >
          <FaPhone className="text-2xl" />
        </a>
      </div>
    </div>
  </section>
);

export default Contact;
