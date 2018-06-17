process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

const PROTOCOL = 'http';
const HOST = "0.0.0.0";
const DEFAULT_PORT = 5000;


const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const { choosePort, prepareUrls, prepareProxy, createCompiler } = require("react-dev-utils/WebpackDevServerUtils");
const openBrowser = require('react-dev-utils/openBrowser');

const paths = require('../webpack/paths');
const config = require("../webpack/webpack.config.dev");
const proxy = require('../webpack/proxy');
const router = require('../webpack/router');
const createDevServerConfig = require('../webpack/webpackDevServer.config');


choosePort(HOST, DEFAULT_PORT).then(port => {
  if(port == null) {
    return;
  }
  const urls = prepareUrls(PROTOCOL, HOST, port);
  const compiler = createCompiler(webpack, config, "app name", urls, true);
  const proxyConfig = prepareProxy(proxy, paths.public);
  const devServerConfig = createDevServerConfig(proxyConfig, paths.public);
  const server = new WebpackDevServer(compiler, devServerConfig);
  
  server.use(router);
  
  server.listen(port, HOST, err => {
    if(err) {
      console.log(err);
      return;
    }
    console.log('starting the dev server');

    openBrowser(urls.localUrlForBrowser);
  })
}).catch(err => {
  if(err) {
    console.log(err.message);
  }
  process.exit(1);
})
