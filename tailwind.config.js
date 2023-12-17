/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        sec: "#F1FAEE",
        pri: "#1D3557",
        red: "#E63946",
        skyblue: "#A8DADC",
        darkb: "#457B9D",
        void: "#252525",
      },
      fontFamily: {
        primary: "IBM Plex Mono",
      },
      screens: {
        vsm: "406px",
        vvsm: "100px",
        "ghlogo-vsm": { min: "406px", max: "640px" },
        "ghlogo-vvsm": { min: "100px", max: "406px" },
      },
    },
    animation: {
      spin: "spin 2s linear infinite",
    },
  },
  plugins: [],
};
