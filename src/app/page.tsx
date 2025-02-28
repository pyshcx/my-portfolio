// src/app/page.tsx
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Experiences from './components/Experiences';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';

export default function Page() {
  return (
    <div>
      <Navbar />
      <Home />
      <About />
      <Experiences />
      <Projects />
      <Education />
      <Contact />
    </div>
  );
}
