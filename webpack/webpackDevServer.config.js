const paths = require('./paths');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const config = require('./webpack.config.dev.js');

module.exports = function createDevServerConfig(proxy, host) {
  return {
    proxy,
    public: host,
    host: '0.0.0.0',
    compress: true,
    clientLogLevel: 'none',
    contentBase: paths.public,
    watchContentBase: true,
    hot: true,
    publicPath: config.output.publicPath,
    overlay: false,
    historyApiFallback: {
      disableDotRule: true,
    },
    before(app) {
      app.use(errorOverlayMiddleware());
    }
  };
};