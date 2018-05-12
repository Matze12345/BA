var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: path.join(__dirname, "src"),
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./js/client.js",
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.jpg$/,
                loader: 'file-loader'
            },
            {
                test: /\.png$/,
                loader: 'file-loader'
            }
        ]
    },
    output: {
        path: __dirname + "/src/",
        filename: "client.min.js",
         publicPath: "/javascripts/",
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false}),
    ],
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
    ]
};

/*
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
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.jpg$/,
                loader: 'file-loader'
            },
            {
                test: /\.png$/,
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

*/

/*
let webpack = require('webpack');
let path = require('path');

module.exports = {
    context: path.join(__dirname, "src"),
    devtool: "source-map",
    entry: "./js/client.js",
    module: {
        loaders: [
                 {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    babelrc: false,
                    presets: ['react', 'env', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.txt$/,
                loader: 'raw-loader'
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.less$/,
                loaders: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                loader: 'file-loader',
                query: {
                    name: '[path][name].[ext]?[hash:8]'
                }
            },
            {
                test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    name: '[path][name].[ext]?[hash:8]',
                    limit: 10000
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    output: {
        path: __dirname + "/src/",
        filename: "client.min.js",
        publicPath: "/javascripts/"
    },
    plugins:  [
        // Important for production mode
        // if this is set react takes a smaller version
        new webpack.DefinePlugin({
            'process.env': {
                // This has effect on the react lib size
                'NODE_ENV': JSON.stringify('production'),
            }
        }),
        // Ignore plugins which we don't need in production mode
        // locale is implmeneted in webpack/react but we don't need it
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // Canvas isnt necessary because canvas is implemented in the browser
        new webpack.IgnorePlugin(/canvas|jsdom/, /konva/),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
       // new webpack.NoEmitOnErrorsPlugin(),
        // Uglifies js and minimize it
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false, // Suppress uglification warnings
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true
            },
            sourceMap:true,
            output: {
                comments: false,
            },
            exclude: [/\.min\.js$/gi] // skip pre-minified libs
        }),
    ],
};
*/