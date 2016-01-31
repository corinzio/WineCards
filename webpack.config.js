(function() {
  'use strict';
  // Modules
  var autoprefixer = require('autoprefixer');
  var webpack = require('webpack');
  var ExtractTextPlugin = require('extract-text-webpack-plugin');
  var CopyWebpackPlugin = require('copy-webpack-plugin');
  var path = require('path');
  var WebpackStrip = require('strip-loader');

  module.exports = {
    entry: {
      app: path.join(__dirname,  '/src/app.js')
    },
    output: {
      // Absolute output directory
      path: path.join(__dirname,  '/www'),
      // Output path from the view of the page
      // Uses webpack-dev-server in development
      publicPath: '/',
      // Filename for entry points
      // Only adds hash in build mode
      filename: '[name].bundle.js',
      // Filename for non-entry points
      // Only adds hash in build mode
      chunkFilename: '[name].bundle.js'
    },
    module: {
      //preLoaders: [],
      loaders: [{
        // JS LOADER
        // Reference: https://github.com/babel/babel-loader
        // Transpile .js files using babel-loader
        // Compiles ES6 and ES7 into ES5 code
        test: /\.js$/,
        loader: 'babel!jshint',//!strip-loader?strip[]=debug,strip[]=console.log',
        exclude: /node_modules/
      }, {
        // HTML LOADER
        // Reference: https://github.com/webpack/raw-loader
        // Allow loading html through js
        test: /\.html$/,
        loader: 'raw'
      }, {
        test: /\.css$/,
        // Reference: https://github.com/webpack/extract-text-webpack-plugin
        // Extract css files in production builds
        //
        // Reference: https://github.com/webpack/style-loader
        // Use style-loader in development for hot-loading
        loader: ExtractTextPlugin.extract('css?sourceMap!postcss')
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }]
    },
    postcss: [
      autoprefixer({
        browsers: ['last 2 version']
      })
    ],
    jshint: {
      camelcase: false,
      emitErrors: true,
      failOnHint: false,
      esnext: true
    },
    plugins: [
      //new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new ExtractTextPlugin('style.css'),
      new CopyWebpackPlugin([
        {
          from: path.join(__dirname, '/src/static/lang/'), to: './static/lang/'
        },
        {
          from: path.join(__dirname, '/src/static/font_awesome/'), to: './static/font_awesome/'
        },
        {
          from: path.join(__dirname, '/src/static/fonts/'), to: './static/fonts/'
        },
        {
          from: path.join(__dirname, 'src/index.html')
        }
      ])
    ]
  };
}());
