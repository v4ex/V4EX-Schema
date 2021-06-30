const Path = require('path')

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  target: 'web',
  devtool: 'source-map',
  experiments: {
    outputModule: true,
  },
  optimization: {
    minimize: true,
  },
  output: {
    path: Path.resolve(__dirname, 'build'),
    filename: 'worker.mjs',
    libraryTarget: 'module',
    sourceMapFilename: 'worker.mjs.map',
  },
}
