"use strict";

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const cwd = process.cwd();
const path = require("path");

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
            { test: /\.html$/, use: { loader: "html-loader", options: { interpolate: true } } },
            { test: /\.(jpe?g|png|gif)$/, loader: urlLoader },
            { test: /\.(otf|ttf|woff|woff2)$/, loader: urlLoader },
            { test: /\.(eot|svg)$/, loader: fileLoader }
        ]
    },
    output: {
        path: path.join(cwd, "dist"),
        filename: "[name].[hash].bundle.js",
        chunkFilename: "[id].[hash].chunk.js"
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "app.[hash].css"
        }),
        new HtmlWebpackPlugin({
            template: "index.html"
        })
    ]
};
