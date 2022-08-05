/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  variants: {
    extend: {
        display: ["group-hover"],
    },
  },
  theme: {
    extend: {
      backgroundImage: {
        'banner': "url('./assets/bgcustom.jpg')",
        'appointment': "url('./assets/images/appointment.png')",
        'footer' : "url('./assets/images/footer.png')",
      }
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1E5631",
          secondary: "#68BB59",
          accent: "#4C9A2A",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}