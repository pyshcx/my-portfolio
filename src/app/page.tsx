// src/app/page.tsx
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


export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden">
      <PageLoader />
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
      <ScrollToTop />
    </main>
  );
}
