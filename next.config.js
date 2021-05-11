const withCSS = require("@zeit/next-css")
const withPurgeCss = require("next-purgecss")
const withImages = require("next-images")
const withReactSvg = require("next-react-svg")
const path = require("path")

module.exports = withImages({
  fileExtensions: ["jpg", "jpeg", "png", "gif"],
  webpack(config) {
    return config
  }
})

module.exports = withReactSvg({
  include: path.resolve(__dirname, "/public/static/"),
  webpack(config) {
    return config
  }
})

const withBabelMinify = require("next-babel-minify")({
  comments: false
})

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
  }
}

module.exports = withBabelMinify({
  webpack(config) {
    return config
  }
})

module.exports = withCSS(
  {
    env: {
      API_URL: process.env.API_URL
    }
  },
  withPurgeCss({
    purgeCssPaths: [
      "pages/**/*",
      "components/**/*", // also scan other-components folder
      "Layout/**/*"
    ]
  })
)

module.exports = {
  webpack: (config, { webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))

    // Important: return the modified config
    return config
  }
}
