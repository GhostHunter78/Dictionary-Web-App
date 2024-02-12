export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inconsolata: ["Inconsolata", "mono"],
        inter: ["Inter", "sans-serif"],
        lora: ["Lora", "serif"],
      },
      colors: {
        lightGray: "#e9e9e9",
        bgInput: "#f4f4f4",
        activePurpleBorder: "#a445ed",
      },
    },
  },
  plugins: [],
};
