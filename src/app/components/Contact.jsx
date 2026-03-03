"use client";

import { FaEnvelope, FaPhone } from "react-icons/fa";
import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';

const Contact = () => (
  <SectionWrapper id="contact">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className="max-w-lg mx-auto text-center"
    >
      <h2 className="section-title">Contact Me</h2>

      <div className="card max-w-lg mx-auto mb-6">
        <p className="text-lg md:text-xl text-slate-300 mb-10">
          Let's connect and create something amazing together.
        </p>

        {/* Contact Icons */}
        <div className="flex justify-center space-x-8 md:space-x-12">
          {/* Email Icon */}
          <motion.a
            href="mailto:pranayshah1908@gmail.com"
            className="bg-gradient-to-br from-[var(--color-teal)] to-[var(--color-info)] text-slate-950 p-5 md:p-6 rounded-full shadow-lg border border-white/10"
            title="Send Email"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 10px 25px -5px rgba(0, 242, 209, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEnvelope className="text-2xl md:text-3xl" />
          </motion.a>

          {/* Phone Icon */}
          <motion.a
            href="tel:+918866092052"
            className="bg-gradient-to-br from-[var(--color-teal)] to-[var(--color-info)] text-slate-950 p-5 md:p-6 rounded-full shadow-lg border border-white/10"
            title="Call Me"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 10px 25px -5px rgba(0, 242, 209, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPhone className="text-2xl md:text-3xl" />
          </motion.a>
        </div>

        {/* Additional text */}
        <p className="mt-10 text-slate-400 italic font-light">
          "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle." - Steve Jobs
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-slate-500 text-sm mt-4"
      >
        Feel free to reach out anytime. I'm always open to discussing new projects and opportunities.
      </motion.div>
    </motion.div>
  </SectionWrapper>
);

export default Contact;
