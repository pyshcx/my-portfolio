module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-bg-deep)",
        card: "var(--color-bg-card)",
        accent: "var(--color-bg-accent)",
        primary: {
          DEFAULT: "var(--color-teal)",
          glow: "var(--color-teal-glow)",
        },
        secondary: {
          DEFAULT: "var(--color-info)",
        },
        cyber: {
          DEFAULT: "var(--color-cyber)",
          glow: "var(--color-cyber-glow)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          dim: "var(--color-text-dim)",
        },
        border: {
          card: "var(--color-card-border)",
        },
      },
      backgroundImage: {
        'gradient-primary': 'radial-gradient(circle at top center, var(--color-bg-accent) 0%, var(--color-bg-deep) 100%)',
      },
    },
  },
  plugins: [],
};
