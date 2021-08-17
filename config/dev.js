/**
 * @Descripttion: dev
 * @version: 1.0.0
 * @Author: zf
 * @Date: 2021-08-13 11:03:19
 * @LastEditors: zf
 * @LastEditTime: 2021-08-13 11:03:19
 */
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const { merge } = require('webpack-merge');

module.exports = merge(webpackConfig, {
    target: 'web',

    watch: false,

    watchOptions: {
        poll: 3000, // 每秒打包一次
        // 防抖，一直输入代码，停止输入 500 毫秒后再打包。
        aggregateTimeout: 500,
        // 不需要进行监控的文件或目录
        ignored: /node_modules/,
    },

    plugins: [new webpack.HotModuleReplacementPlugin()],

    module: {
        rules: [
            {
                test: /\.css$/,
                include: [path.resolve(__dirname, '../src')],
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.s[ac]ss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'scss-loader'],
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
            },
        ],
    },

    devServer: {
        host: 'localhost',
        // 设置端口号
        port: '8888',
        contentBase: path.join(__dirname, '../dist'),
        // 这个publicPath代表静态资源的路径（打包后的静态资源路径）
        publicPath: '/',
        // 当设置成 true时，任意的 404 响应都可能需要被替代为 index.html
        historyApiFallback: true,
        hotOnly: false,
        // 是否开启 模块热替换功能
        hot: true,
        // 是否让浏览器自动打开（默认是 false）
        open: false,
        // 被作为索引文件的文件名。
        // 默认是 index.html，可以通过这个来做更改
        index: 'index.html',
    },
});
