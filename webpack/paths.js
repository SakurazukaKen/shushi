const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  root: appDirectory,
  dist: resolvePath('dist'),
  public: resolvePath('public'),
  html: resolvePath('public/index.html'),
  index: resolvePath('src/index.tsx'),
  package: resolvePath('package.json'),
  src: resolvePath('src'),
  nodeModules: resolvePath('node_modules'),
  tslint: resolvePath('tslint.json'),
  tsconfig: resolvePath('tsconfig.json'),
  assets: resolvePath('src/assets'),
  assetsIcon: resolvePath('src/assets/icons'),
  assetsImage: resolvePath('src/assets/images'),
}