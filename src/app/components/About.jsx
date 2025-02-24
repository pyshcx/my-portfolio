// components/About.jsx
"use client"; // Add this line at the very top of the file

const About = () => (
  <section id="about" className="py-16 bg-white dark:bg-gray-800">
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <div>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">About Me</h2>
      <p className="text-gray-600 dark:text-gray-300">
        Currently pursuing a B.Tech at VIT Vellore, I am building a strong foundation in computer and information systems security. 
        My academic journey is complemented by hands-on experience in autonomous vehicles, with a vision to pioneer the realm of autonomous driving.
      </p>
    </div>
  </div>
</section>

);

export default About;
