// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lidar: {
          black: "#0C0C0C", // Deep black for backgrounds
          teal: "#00FFD1", // Teal green for highlights
          white: "#FFFFFF", // White for text
          darkTeal: "#005F50", // Dark teal for hover effects
        },
      },
      backgroundImage: {
        lidarBg: "url('/lidar-bg.jpg')", // Reference your LiDAR-inspired image here
      },
    },
  },
  plugins: [],
};
