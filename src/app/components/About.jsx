"use client";

const About = () => (
  <section id="about" className="py-16 bg-lidar-black text-lidar-white">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Left Side: Text Content */}
      <div>
        <h2 className="text-4xl font-bold text-lidar-teal mb-6">About Me</h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          I am currently pursuing a B.Tech at VIT Vellore with hands-on experience in autonomous vehicles.
          My expertise lies in Artificial Intelligence, Machine Learning, and Computer Vision. I am passionate
          about building innovative solutions in the realm of autonomous systems and cutting-edge technologies.
        </p>
        <p className="mt-4 text-lg text-gray-300 leading-relaxed">
          With a strong foundation in AI and ML, I aspire to contribute to the development of smart systems
          that can revolutionize industries and improve lives.
        </p>
      </div>

      {/* Right Side: Image */}
      <div className="flex justify-center">
        <img
          src="/lidar-bg.jpg" // Ensure this image is saved in the public/images folder
          alt="LiDAR Visualization"
          className="rounded-lg shadow-lg w-full max-w-md"
        />
      </div>
    </div>
  </section>
);

export default About;
