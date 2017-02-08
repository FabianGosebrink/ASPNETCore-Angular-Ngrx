let ExtractTextPlugin = require('extract-text-webpack-plugin');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let path = require('path');

module.exports = {
    devtool: 'source-map',
    performance: {
        hints: false
    },

    entry: {
        'app': './app/main.ts' // JiT compilation
    },

    output: {
        path: __dirname + '/.dist/web/jit/',
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
                loader: "style-loader!css-loader"
            }
        ]
    },

    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, '/.dist/web/jit/')
    },

    plugins: [

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