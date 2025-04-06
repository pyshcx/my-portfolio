"use client";

const ResearchSection = () => {
  const researchItems = [
    {
      title: "AI in Healthcare",
      description: "Exploring the use of AI to improve medical diagnostics and patient care.",
    },
    {
      title: "Autonomous Systems",
      description: "Developing algorithms for autonomous vehicles and robotics.",
    },
    {
      title: "Computer Vision",
      description: "Using deep learning for image recognition and object detection.",
    },
  ];

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-[#00BFA6]/20">
      {researchItems.map((item, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-lg font-semibold text-[#333333]">{item.title}</h3>
          <p className="text-sm text-[#333333]">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ResearchSection;
