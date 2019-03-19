const webpack = require('webpack');

module.exports = {
    entry: {
        application: [
            './src/mainApp/index'
        ]
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        libraryTarget: 'amd'
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx']
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
            { test: /\.js$/, loader: 'source-map-loader', enforce: 'pre' }
        ]
    },

    externals: [
        function(context, request, callback) {
            if (/^dojo/.test(request) ||
                /^dojox/.test(request) ||
                /^dijit/.test(request) ||
                /^esri/.test(request)
            ) {
                return callback(null, 'amd ' + request);
            }
            callback();
        }
    ]
};