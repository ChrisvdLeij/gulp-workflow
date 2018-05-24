// webpack.config.js

const path = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'js')
  }
};
