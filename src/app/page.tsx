// src/app/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Experiences from './components/Experiences';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import PageLoader from './components/PageLoader';
import { LoadingProvider } from './components/LoadingContext';
import { Analytics } from '@vercel/analytics/react';

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LoadingProvider>
      <main className="min-h-screen overflow-hidden">
        <PageLoader />
        {!isLoading && (
          <>
            <Navbar />
            <div className="continuous-content">
              <Home />
              <div className="section-divider" />
              <About />
              <div className="section-divider" />
              <Experiences />
              <div className="section-divider" />
              <Projects />
              <div className="section-divider" />
              <Education />
              <div className="section-divider" />
              <Contact />
            </div>
            <Footer />
          </>
        )}
        <Analytics />
        <ScrollToTop />
      </main>
    </LoadingProvider>
  );
}
