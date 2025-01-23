/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: "class",

  theme: {
    extend: {
      colors: {
        // Dark Theme variables
        background_dark: "#181D31",
        text_dark: "#EEEEEE",

        // Light theme variables
        background_light: "#f8f8f8",
        text_light: "#181D31",

        // Primary theme variables
        primary: "#5B913B",
        primary_hover: "#12a79d",

        overlay: "#01201e74",

        // Secondary theme variables
        secondary: "#1e272e",

        blue: "#2980b9",

        gray_overlay: "#ababab2a",
      },

      fontFamily: {
        noto_kufi: ["Noto Kufi Arabic", "display", "sans-serif"],
        el_messiri: ["El Messiri", "display", "serif"],
      },

      borderColor: {
        light: "#181D3150",
        dark: "#dddddd1a",
      },

      keyframes: {
        HorizentalMove: {
          "0%, 100%": { transform: "translateY(-10px) scale(1)", opacity: 1 },
          "50%": { transform: "translateY(0px) scale(1.01)", opacity: 0.5 },
        },
        ShadowPulse: {
          "0%, 100%": { boxShadow: "7px 12px #2B4865", opacity: 1 },
          "50%": { opacity: 0.9 },
        },
        ScaleEffect: {
          "0%, 100%": { scale: "1", opacity: 1 },
          "50%": { scale: "1.01", opacity: 0.9 },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
        },
      },
      animation: {
        HorizentalMove: "HorizentalMove 1.5s linear infinite",
        ShadowPulse: "ShadowPulse 2.5s linear infinite",
        ScaleEffect: "ScaleEffect 4s linear infinite",
        shake: "shake 0.7s linear 1",
      },
      backgroundImage: {
        "home-landing": "url('/home-landing.jpg')",
        "about-landing": "url('/about-landing.jpg')",
        subscribe: "url('/subscribe.jpg')",
      },
    },
  },
  plugins: [],
};
