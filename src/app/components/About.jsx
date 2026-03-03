// About.jsx — SD × Cyber × AI/ML rebrand
"use client";

import Image from 'next/image';
import SectionWrapper from '../components/SectionWrapper';
import { motion } from 'framer-motion';

const skillGroups = [
  {
    label: "AI / ML",
    badgeClass: "badge-ai",
    skills: ["Python", "TensorFlow", "PyTorch", "OpenCV", "ROS", "NumPy"],
  },
  {
    label: "Cybersecurity",
    badgeClass: "badge-cyber",
    skills: ["Network Security", "VAPT", "OWASP", "Wireshark", "Burp Suite", "Linux"],
  },
  {
    label: "Software Dev",
    badgeClass: "badge-dev",
    skills: ["React", "Next.js", "Node.js", "REST APIs", "Git", "Docker"],
  },
];

const About = () => (
  <SectionWrapper id="about">
    <h2 className="section-title">About Me</h2>
    <div className="card">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

        {/* Left Side: Text Content */}
        <div className="space-y-5">
          <motion.p
            className="section-text"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            I'm a B.Tech student at <span className="text-[var(--color-teal)] font-semibold">VIT Vellore</span> with
            a passion that spans three domains: <span className="text-[var(--color-teal)] font-semibold">AI/ML engineering</span>,{" "}
            <span className="text-[var(--color-cyber)] font-semibold">cybersecurity</span>, and{" "}
            <span className="text-[var(--color-info)] font-semibold">software development</span>.
          </motion.p>
          <motion.p
            className="section-text"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            I'm joining <span className="text-[var(--color-cyber)] font-semibold">Flipkart</span> as an{" "}
            <span className="text-[var(--color-cyber)] font-semibold">Information Security Intern</span> — applying
            AI-driven threat detection in one of India's most demanding e-commerce environments. My prior
            research includes physics-informed deep learning at Ahmedabad University, generative AI at IIIT Delhi,
            and computer vision at MedAI Technologies.
          </motion.p>
          <motion.p
            className="section-text"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            I believe the most impactful systems are those that are both{" "}
            <em>intelligent</em> and <em>secure</em> — and I'm building toward that intersection.
          </motion.p>

          {/* Skill tag groups */}
          <div className="space-y-3 pt-2">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <p className="text-xs text-[var(--color-text-secondary)] font-mono-accent mb-2 uppercase tracking-widest">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className={group.badgeClass}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="flex justify-center mt-8 md:mt-0">
          <motion.div
            className="relative w-full max-w-sm md:max-w-md aspect-square rounded-lg overflow-hidden teal-glow"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Image
              src="/IMG_1139.JPG"
              alt="Pranay Shah"
              fill
              priority
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </motion.div>
        </div>
      </div>
    </div>
  </SectionWrapper>
);

export default About;
