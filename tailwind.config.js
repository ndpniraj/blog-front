module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      transitionProperty: {
        bottom: "bottom",
        height: "height",
      },
      width: {
        "device-width": "360px",
      },
      height: {
        "device-height": "640px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("@tailwindcss/typography")],
};
