module.exports = ({ env }) => ({
  map: env === 'development' ? 'inline' : false,
  plugins: {
    "postcss-import": true,
    "cssnano": env === 'production' ? {} : false,
    "autoprefixer": true
  }
});
