// components/Projects.jsx
"use client"; // Add this line at the very top of the file

const Experiences = () => (
    <section id="experience" className="py-16 bg-gray-100 dark:bg-gray-900">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">Experience</h2>
      <div className="space-y-6">
        {/* Team Ojas Racing */}
        <div className="bg-white dark:bg-gray-700 p-6 rounded shadow">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Path Planning Head - Team Ojas Racing</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Mar 2023 - Present</p>
          <ul className="list-disc ml-5 mt-2 text-gray-600 dark:text-gray-300 space-y-1">
            <li>Developed a path planning algorithm using Delaunay Triangulation to optimize race lines.</li>
            <li>Implemented YOLO for real-time object detection, improving obstacle avoidance.</li>
            <li>Contributed to the team's selection among the top 35 at Formula Student Germany 2024.</li>
          </ul>
        </div>
  
        {/* MedAI Technologies */}
        <div className="bg-white dark:bg-gray-700 p-6 rounded shadow">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">AI/ML Intern - MedAI Technologies</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Sep 2024 - Nov 2024</p>
          <ul className="list-disc ml-5 mt-2 text-gray-600 dark:text-gray-300 space-y-1">
            <li>Integrated computer vision technology into a kiosk system for real-time image processing.</li>
            <li>Conducted research on AI/ML models for medical data diagnostics and healthcare automation.</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default Experiences;
