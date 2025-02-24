// components/Projects.jsx
"use client"; // Add this line at the very top of the file

const Projects = () => (
  <section id="projects" className="py-16 bg-custom-700">
  <div className="container mx-auto text-center">
    <h2 className="text-3xl font-bold text-white mb-8">Projects</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Hand Tracking Volume Controller */}
      <div className="bg-custom-600 p-6 rounded-lg shadow hover:bg-custom-500 transition duration-300">
        <h3 className="text-xl font-semibold text-white mb-2">Hand Tracking Volume Controller</h3>
        <p className="text-custom-300">Developed a real-time hand tracking system using Python and OpenCV to control system volume through gestures.</p>
      </div>

      {/* Automated News Summarization */}
      <div className="bg-custom-600 p-6 rounded-lg shadow hover:bg-custom-500 transition duration-300">
        <h3 className="text-xl font-semibold text-white mb-2">Automated News Summarization & Posting System</h3>
        <p className="text-custom-300">Built an automated system to fetch, summarize, and tweet AI/ML news using News API, Gemini AI, and Twitter API.</p>
      </div>
    </div>
  </div>
</section>


);

export default Projects;
