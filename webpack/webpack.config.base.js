const path = require('path');
const HappyPack = require("happypack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("./paths");
const SpriteSmithPlugin = require('webpack-spritesmith');
const spriteTemplate = require('./spriteTemplate');

const happyTreadPool = HappyPack.ThreadPool({ size: 5 });

module.exports = {
  context: paths.root,
  devtool: 'cheap-module-source-map',
  entry: [paths.index],
  module:{
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: paths.src,
        loader: require.resolve("babel-loader"),
        options: {
          compact: true
        }
      },
      {
        test: /\.(ts|tsx)$/,
        include: paths.src,
        loader: "happypack/loader?id=ts"
      },
      {
        test: [/\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 1024,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new SpriteSmithPlugin({
      src: {
        cwd: paths.assetsIcon,
        glob: '*.png'
      },
      target: {
        image: path.resolve(paths.assetsImage, 'sprite.png'),
        css: [
          [
            path.resolve(paths.src, 'styles/sprite.scss'),
            {
              format: 'classTemplate'
            }
          ]
        ]
      },
      apiOptions: {
        cssImageRef: '../assets/images/sprite.png',
      },
      customTemplates: {
        classTemplate: spriteTemplate
      }
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.html
    }),
    new HappyPack({
      id: "ts",
      threadPool: happyTreadPool,
      loaders: [
        {
          path: "ts-loader",
          query: { happyPackMode: true }
        }
      ]
    }),
    new HappyPack({
      id: "style",
      threadPool: happyTreadPool,
      verbose: false,
      loaders: [
        {
          loader: require.resolve("css-loader"),
          options: {
            sourceMap: true
          }
        },
        {
          loader: require.resolve("postcss-loader"),
          options: {
            sourceMap: true
          }
        },
        {
          loader: require.resolve("sass-loader"),
          options: {
            sourceMap: true
          }
        }
      ]
    }),
    new ForkTsCheckerWebpackPlugin({
      tslint: paths.tslint, checkSyntacticErrors: true }),
  ],
  resolve: {
    alias: {
      assets: paths.assets
    },
    modules: ["node_modules"],
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  }
}