"use client";

import { FaGithub } from "react-icons/fa"; // Import GitHub icon

const Projects = () => (
  <section
    id="projects"
    className="py-16 bg-cover bg-center relative"
    style={{
      backgroundImage: "url('//lidar-bg.jpg')", // Ensure this image is saved in the public/images folder
    }}
  >
    {/* Overlay for better contrast */}
    <div className="absolute inset-0 bg-black bg-opacity-70"></div>

    {/* Content */}
    <div className="relative z-10 container mx-auto px-6 text-center">
      <h2 className="text-4xl font-bold text-lidar-teal mb-12">Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: "Hand Tracking Volume Controller",
            description:
              "Developed a real-time hand tracking system using Python and OpenCV.",
            githubLink: "https://github.com/pyshcx/volumetracking",
          },
          {
            title: "Automated News Summarization",
            description:
              "Built an automated system to fetch, summarize, and tweet AI/ML news.",
            githubLink: "https://github.com/pyshcx/ai-news-tweet-bot",
          },
        ].map((project, index) => (
          <div
            key={index}
            className="bg-lidar-black bg-opacity-80 p-6 rounded-lg shadow-lg hover:scale-[1.02] transform transition duration-300"
          >
            <h3 className="text-xl font-semibold text-lidar-teal mb-2">
              {project.title}
            </h3>
            <p className="text-gray-300 mb-4">{project.description}</p>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-lidar-teal text-black py-2 px-4 rounded-lg hover:bg-lidar-darkTeal transition"
            >
              <FaGithub className="mr-2" /> View on GitHub
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
