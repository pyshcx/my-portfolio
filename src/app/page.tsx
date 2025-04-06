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
import { SpeedInsights } from "@vercel/speed-insights/next";
import MediumSlider from './components/MediumSlider';
import ResearchSection from './components/ResearchSection';

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
            <div className="continuous-content space-y-8">
              <Home />
              <About />
              <Experiences />
              <Projects />
              <Education />

              {/* Articles and Research Section */}
              <section id="articles-research" className="py-16 px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl mx-auto">
                  {/* Articles Section */}
                  <div className="flex flex-col items-center">
                    <h2 className="text-3xl font-bold text-[#333333] text-center mb-6">My Articles</h2>
                    <div className="w-full max-w-md mx-auto">
                      <MediumSlider />
                    </div>
                  </div>

                  {/* Research Section */}
                  <div className="flex flex-col items-center">
                    <h2 className="text-3xl font-bold text-[#333333] text-center mb-6">My Research</h2>
                    <div className="w-full max-w-md mx-auto">
                      <ResearchSection />
                    </div>
                  </div>
                </div>
              </section>

              <Contact />
            </div>
            <Footer />
          </>
        )}
        <Analytics />
        <SpeedInsights />
        <ScrollToTop />
      </main>
    </LoadingProvider>
  );
}
