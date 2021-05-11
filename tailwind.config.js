module.exports = {
  theme: {
    extend: {}
  },
  variants: {},
  plugins: [],
  purge: {
    // Filenames to scan for classes
    content: [
      "./src/**/*.html",
      "./pages/**/*.js",
      "./pages/**/*.jsx",
      "./components/**/*.jsx",
      "./components/**/*.js",
      "./public/index.html"
    ],
    // Options passed to PurgeCSS
    options: {
      // Whitelist specific selectors by name
      // safelist: [],
    }
  }
}
