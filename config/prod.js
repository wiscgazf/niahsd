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
            cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dist')],
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
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
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
                vendors: {
                    // 第三方模块 打包出 chunk-vendors.js 文件
                    name: 'chunk-vendors',
                    test: /node_modules/,
                    priority: -10, // 权重，权重越高，越先被抽离（这样可以做到 vendor 与 common 的分离）
                    chunks: 'all', // async（默认）、initial、all。async 只提取异步 chunk，initial 则只针对入口 chunk 生效，而 all 表示两种模式都开启
                },
                common: {
                    // 自己的模块 导出成 chunk-common.js 文件名
                    name: 'chunk-common',
                    minChunks: 2,
                    priority: -20,
                    chunks: 'all',
                    reuseExistingChunk: true,
                },
            },
        },
    },
});
