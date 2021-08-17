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
    devtool: 'source-map',

    mode: 'production',

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
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'postcss-loader',
                    'scss-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ],
            },
        ],
    },

    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 60000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: 'react',
            // 缓存组 (缓存某些代码)
            cacheGroups: {
                // 第三方模块分片设置
                vendor: {
                    // 第三方模块 打包出 vendors.js 文件
                    name: 'vendors',
                    test: /node_modules/,
                    priority: 2,
                },
                default: {
                    // 自己的模块 导出成 commons.js 文件名
                    name: 'commons',
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
});
