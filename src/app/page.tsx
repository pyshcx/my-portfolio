import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Experiences from './components/Experience';

export default function Page() {
  return (
    <div>
      <Navbar />
      <Home />
      <About />
      <Projects />
      <Experiences />
      <Contact />
    </div>
  );
}
