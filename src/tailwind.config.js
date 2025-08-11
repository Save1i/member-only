// tailwind.config.js
module.exports = {
  content: ["./public/*.{html,js}", "./src/views/**/*.{ejs,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
