const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/scripts/index.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // rules: [
  //   {
  //     test: /\.m?js$/,
  //     exclude: /node_modules/,
  //     use: {
  //       loader: 'babel-loader',
  //       options: {
  //         presets: [['@babel/preset-env', { targets: 'defaults' }]],
  //       },
  //     },
  //   },
  // ],
};
