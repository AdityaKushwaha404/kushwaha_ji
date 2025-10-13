// postcss.config.cjs
module.exports = {
  plugins: [
    // PostCSS plugin adapter for Tailwind
    require('@tailwindcss/postcss'),
    // Autoprefixer for vendor prefixes
    require('autoprefixer')
  ]
}
