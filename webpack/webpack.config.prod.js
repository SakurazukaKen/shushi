const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const paths = require("./paths");


const cssFilename = 'static/styles/[name].[hash:8].css';

const extractTextPluginOptions = {
  publicPath: Array(cssFilename.split('/').length).join('../')
}

const baseConfig = require('./webpack.config.base');

module.exports = Object.assign(baseConfig, {
  bail: true,
  mode: "production",
  devtool: 'source-map',
  entry: [paths.index],
  output: {
    path: paths.dist,
    filename: 'static/js/[name].[hash:8].js',
    chunkFilename: 'static/js/[name].[hash:8].chunk.js',
  },
  module: {
    rules: baseConfig.module.rules.concat([
      {
        test: /\.(scss|sass)$/,
        include: paths.src,
        use: ExtractTextPlugin.extract(Object.assign({
          fallback: "style-loader",
          use: "happypack/loader?id=style"
        }, extractTextPluginOptions))
      }
    ])
  },
  plugins: baseConfig.plugins.concat([
    new ExtractTextPlugin({
      filename: cssFilename
    }),

  ])
})