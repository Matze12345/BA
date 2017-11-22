var path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: "./src/js/client.js",
    output: {
        path: path.join(__dirname, 'src'),
        //filename: 'bundle.js',
        filename: 'client.min.js',
        publicPath: "/javascripts/",
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
                }
            },
            {test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {test: /\.jpg$/,
                loader: 'file-loader'
            },
            {test: /\.png$/,
                loader: 'file-loader'
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(), //dedupe similar code
        new webpack.optimize.UglifyJsPlugin(), //minify everything
        new webpack.optimize.AggressiveMergingPlugin(),//Merge chunks
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),

        new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000}),
        new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15}),
    ],
};

