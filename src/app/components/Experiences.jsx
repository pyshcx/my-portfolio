"use client";

const Experiences = () => (
  <section
    id="experience"
    className="py-16 bg-cover bg-center relative"
    style={{
      backgroundImage: "url('//lidar-bg.jpg')", // Ensure the image is saved in the public/images folder
    }}
  >
    {/* Overlay for better contrast */}
    <div className="absolute inset-0 bg-black bg-opacity-70"></div>

    {/* Content */}
    <div className="relative z-10 container mx-auto px-6">
      <h2 className="text-4xl font-bold text-lidar-teal text-center mb-12">
        Experience
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Experience Cards */}
        {[
          {
            title: "Path Planning Head - Team Ojas Racing",
            date: "Mar 2023 - Present",
            points: [
              "Developed a path planning algorithm using Delaunay Triangulation.",
              "Implemented YOLO for real-time object detection.",
              "Contributed to the team's selection among the top 35 at Formula Student Germany.",
            ],
          },
          {
            title: "AI/ML Intern - MedAI Technologies",
            date: "Sep 2024 - Nov 2024",
            points: [
              "Integrated computer vision technology into a kiosk system.",
              "Conducted research on AI/ML models for medical diagnostics.",
            ],
          },
        ].map((experience, index) => (
          <div
            key={index}
            className="bg-lidar-black bg-opacity-80 p-6 rounded-lg shadow-lg hover:scale-[1.02] transform transition duration-300"
          >
            <h3 className="text-xl font-semibold text-lidar-teal mb-2">
              {experience.title}
            </h3>
            <p className="text-sm text-gray-400 mb-4">{experience.date}</p>
            <ul className="list-disc ml-5 space-y-2 text-gray-300">
              {experience.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Experiences;
