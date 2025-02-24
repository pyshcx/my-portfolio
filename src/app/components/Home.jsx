// components/Home.jsx
"use client"; // Add this line at the very top of the file

import { motion } from 'framer-motion';

const Home = () => (
  <section
  id="home"
  className="relative min-h-screen flex flex-col justify-center items-center text-center bg-cover bg-center"
  style={{
    backgroundImage: "url('/lidar-img-short-bg.jpg')",
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black opacity-50"></div>

  {/* Content */}
  <div className="relative z-10">
    <h1 className="text-5xl font-extrabold text-white mb-4">Hi, I'm Pranay Shah</h1>
    <p className="text-lg text-gray-300 mb-6">
      Passionate about AI, ML, and autonomous systems, leveraging expertise in computer vision and path planning.
    </p>
    <a
      href="#projects"
      className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition"
    >
      View My Work
    </a>
  </div>
</section>


);

export default Home;
