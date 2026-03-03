"use client";
import React from 'react';
import { motion } from "framer-motion";
import { useLoading } from './LoadingContext';

const PageLoader = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-[var(--color-bg-deep)] flex flex-col items-center justify-center z-[9999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <motion.p
        className="mt-24 text-dark text-xl font-bold"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Loading...
      </motion.p>
    </motion.div>
  );
};

export default PageLoader;
