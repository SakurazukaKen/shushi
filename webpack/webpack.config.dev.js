const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const paths = require("./paths");
const baseConfig = require('./webpack.config.base');

const publicPath = "/";

module.exports = Object.assign(baseConfig, {
  mode: "development",
  entry: [
    require.resolve("react-dev-utils/webpackHotDevClient"),
    require.resolve("css-hot-loader/hotModuleReplacement"),
    paths.index
  ],
  module: {
    rules: baseConfig.module.rules.concat([
      {
        test: /\.(scss|sass)$/,
        include: paths.src,
        use: ["css-hot-loader"].concat(
          ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "happypack/loader?id=style"
          })
        )
      }
    ])
  },
  plugins: baseConfig.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: "[name].css"
    })
  ]),
  output: {
    publicPath,
    pathinfo: true,
    filename: "static/js/[name].js",
    chunkFilename: "static/js/[name].chunk.js"
  },
});
