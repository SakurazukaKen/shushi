process.env.NODE_ENV = "production";
process.env.BABEL = "production";

const paths = require("../webpack/paths");
const fs = require("fs-extra");
const config = require("../webpack/webpack.config.prod");
const webpack = require("webpack");
const formatWebpackMessages = require("react-dev-utils/formatWebpackMessages");
const FileSizeReporter = require("react-dev-utils/FileSizeReporter");

const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

function copyPublicFolder() {
  fs.copySync(paths.public, paths.dist, {
    dereference: true,
    filter: file => file !== paths.html
  });
}
function build(previousFileSizes) {
  console.log("creating production build");
  const compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }

      const message = formatWebpackMessages(stats.toJson({}, true));

      if (message.errors.length) {
        if (message.errors.length > 1) {
          message.errors.length = 1;
        }
        return reject(new Error(message.errors.join("\n\n")));
      }
      return resolve({
        stats,
        previousFileSizes,
        warnings: message.warnings
      });
    });
  });
}
FileSizeReporter.measureFileSizesBeforeBuild(paths.dist)
  .then(previousFileSizes => {
    fs.emptyDirSync(paths.dist);
    copyPublicFolder();
    return build(previousFileSizes);
  })
  .then(({ stats, previousFileSizes }) => {
    FileSizeReporter.printFileSizesAfterBuild(stats, previousFileSizes, paths.dist, WARN_AFTER_BUNDLE_GZIP_SIZE, WARN_AFTER_CHUNK_GZIP_SIZE);
  }, err => {
    console.log(err.message);
  });