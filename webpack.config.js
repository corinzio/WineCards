(function () {
    'use strict';
    // Modules
    var webpack = require('webpack');

    module.exports = {
        entry: {
            app: './src/app.js'
        },
        output: {
            // Absolute output directory
            path: __dirname + '/dist',

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
                    loader: 'babel!jshint',
                    exclude: /node_modules/
                },
                {
                    // HTML LOADER
                    // Reference: https://github.com/webpack/raw-loader
                    // Allow loading html through js
                    test: /\.html$/,
                    loader: 'raw'
                }]
        },
        jshint: {
            camelcase: true,
            emitErrors: false,
            failOnHint: false,
            esnext: true
        },
        plugins: [
		//new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.DedupePlugin()
	]
    };
}());