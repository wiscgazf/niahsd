/**
 * @Descripttion: prod
 * @version: 1.0.0
 * @Author: zf
 * @Date: 2021-08-13 11:03:34
 * @LastEditors: zf
 * @LastEditTime: 2021-08-13 11:03:34
 */
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const webpackConfig = require('./webpack.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(webpackConfig, {
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.join(__dirname, '../dist')],
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[hash].css?[hash]',
        }),
    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                include: [path.resolve(__dirname, '../src')],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'postcss-loader',
                ],
            },
        ],
    },
});
