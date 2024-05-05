const webpack = require("webpack");

module.exports = {
  publicPath: '',
  assetsDir: '', // Change this to a relative path
  configureWebpack: {
    output: {
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].js',
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6,
      }),
    ],
  },
  lintOnSave: false,
  pwa: {
    name: "SERVER",
    themeColor: "#344675",
    msTileColor: "#344675",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "#344675",
  },
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false,
    },
  },
  css: {
    sourceMap: process.env.NODE_ENV !== "production",
  },
};
