// Example for About.tsx
"use client";

import Image from 'next/image';
import SectionWrapper from '../components/SectionWrapper';

const About = () => (
  <SectionWrapper id="about">
    <h2 className="section-title">About Me</h2>
    <div className="glass-card p-6 md:p-8 rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left Side: Text Content */}
        <div className="space-y-6">
          <p className="section-text">
            I am currently pursuing a B.Tech at VIT Vellore with hands-on experience in autonomous vehicles.
            My expertise lies in Artificial Intelligence, Machine Learning, and Computer Vision. I am passionate
            about building innovative solutions in the realm of autonomous systems and cutting-edge technologies.
          </p>
          <p className="section-text">
            With a strong foundation in AI and ML, I aspire to contribute to the development of smart systems
            that can revolutionize industries and improve lives.
          </p>
          <div className="flex flex-wrap gap-3 md:gap-4 mt-6">
            {['Python', 'TensorFlow', 'PyTorch', 'OpenCV', 'ROS'].map((skill, index) => (
              <span key={index} className="bg-[#F5F5F5] text-[#3A6EA5] px-3 py-1 rounded-full text-sm shadow-md">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="flex justify-center mt-8 md:mt-0">
          <div className="relative w-full max-w-sm md:max-w-md aspect-square rounded-lg overflow-hidden shadow-xl shadow-[#3A6EA5]/40">
            <Image
              src="/IMG_1139.JPG"
              alt="Pranay Shah working on autonomous systems"
              fill
              priority
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  </SectionWrapper>
);

export default About;
