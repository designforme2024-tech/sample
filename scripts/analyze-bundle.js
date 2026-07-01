process.env.NODE_ENV = 'production';
process.env.BABEL_ENV = 'production';

const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const createWebpackConfig = require('react-scripts/config/webpack.config');

const config = createWebpackConfig('production');
config.plugins.push(
  new BundleAnalyzerPlugin({
    analyzerMode: 'server',
    defaultSizes: 'parsed',
    openAnalyzer: true,
    reportFilename: 'bundle-report.html',
    generateStatsFile: true,
    statsFilename: 'bundle-stats.json',
  })
);

const compiler = webpack(config);

compiler.run((err, stats) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
    process.exit(1);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }

  console.log('Bundle analysis server started.');
  console.log('Open the browser if it did not launch automatically.');
});
