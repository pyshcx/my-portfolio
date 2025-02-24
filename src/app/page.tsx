// src/app/page.tsx
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Experiences from './components/Experiences';
import Contact from './components/Contact';

export default function Page() {
  return (
    <div>
      <Navbar />
      <Home />
      <About />
      <Experiences />
      <Projects />
      <Contact />
    </div>
  );
}
