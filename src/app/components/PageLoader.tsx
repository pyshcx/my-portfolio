"use client";
import React from 'react';
import { useState, useEffect } from "react";
const PageLoader = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);
  
  if (!loading) return null;
  
  return (
    <div className="fixed inset-0 bg-lidar-black flex items-center justify-center z-[9999]">
      <div className="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};



export default PageLoader;
