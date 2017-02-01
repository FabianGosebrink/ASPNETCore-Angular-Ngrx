let ExtractTextPlugin = require('extract-text-webpack-plugin');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let path = require('path');
let FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    performance: {
        hints: false
    },

    entry: {
        'app': './app/main.ts' // JiT compilation
    },

    output: {
        path: './.dist/jit/',
        filename: 'js/[name].bundle.js'
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
                    'angular-router-loader',
                    'angular2-template-loader',
                    'source-map-loader'
                ]
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            },
            {
                test: /\.(png|jpg|gif|ico|woff|woff2|ttf|svg|eot)$/,
                loader: 'file-loader?name=assets/[name].[ext]',
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css-loader')
            }
        ]
    },

    devServer: {
        contentBase: "/",
        compress: true,
        watchContentBase: true,
        port: 9000
    },
    plugins: [
        new FaviconsWebpackPlugin({
            logo: './foodChooserLogo.jpg',
            prefix: 'assets/'
        }),
        new CleanWebpackPlugin(
            [
                './.dist/jit/'
            ]
        ),
        new ExtractTextPlugin("styles.css"),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: 'index.html'
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ]
};