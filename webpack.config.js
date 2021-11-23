const path = require('path');

module.exports = {
  entry: {
    path: path.resolve(__dirname, 'src', 'main.js'),
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'publick'),
  },
  devtool: 'source-map',
  devServer: {
    hot: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      }
    ]
  }
};
