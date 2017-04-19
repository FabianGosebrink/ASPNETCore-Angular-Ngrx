var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var path = require('path');

module.exports = {
    entry: {
        'app': './src/app/main-aot.ts' // AoT compilation
    },

    output: {
        path: path.join(__dirname, '.dist/web/aot/'),
        filename: 'js/[name]-[hash:8].bundle.js',
        chunkFilename: 'js/[id]-[hash:8].chunk.js',
    },

    resolve: {
        extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'awesome-typescript-loader',
                    'angular-router-loader?aot=true&genDir=src/.aot/'
                ]
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            },
            {
                test: /\.(png|jpg|gif|ico|woff|woff2|ttf|svg|eot)$/,
                loader: 'file-loader?name=assets/[name]-[hash:6].[ext]',
            },
            {
                test: /\.css$/,
                loader:  ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"}),
                exclude: [
                    path.resolve(__dirname, "src/app")
                ]
            },
            {
                test: /\.css$/,
                loader:  "to-string-loader!css-loader",
                include: [
                    path.resolve(__dirname, "src/app")
                ]
            }
        ],
        exprContextCritical: false
    },
    plugins: [
        new FaviconsWebpackPlugin({
            logo: './src/icon.png',
            prefix: 'assets/'
        }),
        new CleanWebpackPlugin(
            [
                './.dist/web/aot/'
            ]
        ),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: false
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new ExtractTextPlugin("styles.css"),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: './src/index.html'
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ]
};