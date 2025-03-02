module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          navy: "#1E3D58",
          blue: "#3A6EA5",
          teal: "#00BFA6",
          lightTeal: "#82E9F5",
        },
        text: {
          dark: "#333333",
          light: "#F5F5F5",
          gray: "#D3D3D3",
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
