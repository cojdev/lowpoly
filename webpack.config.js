const path = require('path');

module.exports = {
  entry: './src/js/index.jsx',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'docs/js'),
    publicPath: '/js',
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  devServer: {
    contentBase: path.join(__dirname, 'docs'),
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
