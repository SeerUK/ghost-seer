"use strict";

const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const cwd = process.cwd();
const path = require("path");
const webpack = require("webpack");

// File resolution:
const fileLoader = "file-loader?name=[path][name].[hash].[ext]";
const urlLoader = "url-loader?limit=10000&name=[path][name].[hash].[ext]";

// Styles
const cssLoader = { loader: "css-loader", options: { sourceMap: true } };
const postCssLoader = { loader: "postcss-loader", options: { sourceMap: true } };
const resolveUrlLoader = { loader: "resolve-url-loader", options: { sourceMap: true, keepQuery: true } };
const sassLoader = { loader: "sass-loader", options: { sourceMap: true } };

const styleBaseLoaders = [ cssLoader, postCssLoader ];
const styleSassLoaders = [ cssLoader, postCssLoader, resolveUrlLoader, sassLoader ];

// Configuration
module.exports = {
    context: path.join(cwd, "src"),
    devtool: "source-map",
    devServer: {
        compress: true,
        disableHostCheck: true,
        host: "0.0.0.0",
        port: 8080
    },
    entry: {
        "app": "./js/app.js"
    },
    module: {
        rules: [
            { test: /\.css$/, use: ExtractTextPlugin.extract({ fallback: "style-loader", use: styleBaseLoaders }) },
            { test: /\.scss$/, use: ExtractTextPlugin.extract({ fallback: "style-loader", use: styleSassLoaders }) },
            { test: /\.html$/, use: "html-loader" },
            { test: /\.(jpe?g|png|gif)$/, use: urlLoader },
            { test: /\.(otf|ttf|woff|woff2)$/, use: urlLoader },
            { test: /\.(eot|svg)$/, use: fileLoader }
        ]
    },
    output: {
        path: path.join(cwd, "dist"),
        filename: "assets/js/[name].[hash].bundle.js",
        chunkFilename: "assets/js/[id].[hash].chunk.js"
    },
    plugins: [
        new CleanWebpackPlugin([ "dist" ], {
            exclude: [
                ".gitkeep"
            ],
            watch: true
        }),
        new CopyWebpackPlugin([
            { from: "package.json" },
            { from: "**/*.hbs" }
        ], { copyUnmodified: true }),
        new ExtractTextPlugin({
            filename: "assets/css/app.[hash].css"
        }),
        new HtmlWebpackPlugin({
            cache: false,
            inject: false,
            filename: "default.hbs",
            template: "default.hbs"
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                drop_console: false,
                warnings: false
            },
            mangle: true
        })
    ]
};
