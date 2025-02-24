"use client";

const Home = () => (
  <section
    id="home"
    className="min-h-screen flex flex-col justify-center items-center text-center bg-cover bg-center relative"
    style={{
      backgroundImage: "url('/lidar-bg.jpg')", // Ensure this matches the path to your image
    }}
  >
    {/* Overlay for better text contrast */}
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>

    {/* Content */}
    <div className="relative z-10">
      <h1 className="text-5xl font-extrabold text-lidar-teal mb-4">
        Hi, I'm Pranay Shah
      </h1>
      <p className="text-lg text-lidar-white mb-6">
        Passionate about AI, ML, and autonomous systems.
      </p>
      <a
        href="#projects"
        className="bg-lidar-teal text-black py-3 px-6 rounded-lg hover:bg-lidar-darkTeal transition font-bold"
      >
        View My Work
      </a>
    </div>
  </section>
);

export default Home;
