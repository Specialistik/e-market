var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'static/js/public');
var APP_DIR = path.resolve(__dirname, 'src');

var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});


var config = {
  entry: {
      app: './src/index.js'
    },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  devtool: 'inline-source-map',
  module : {
    rules: [{
        test: /\.(js)|(jsx)$/,
        loaders: ['babel-loader'],
        include: APP_DIR
    }],
  },
};


module.exports = config;