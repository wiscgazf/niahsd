/**
 * @Descripttion: webpack.config
 * @version: 1.0.0
 * @Author: zf
 * @Date: 2021-08-12 18:33:21
 * @LastEditors: zf
 * @LastEditTime: 2021-08-12 18:33:21
 */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Happypack = require('happypack');

const files = fs.readdirSync(path.join(__dirname, '../src/pages/'));

const entryInfo = {}; // 入口js
const htmlPluginData = []; // 多页html

for (let i = 0; i < files.length; i++) {
    entryInfo[files[i]] = path.join(__dirname, '../src/pages/' + files[i] + '/index.js');
    htmlPluginData.push(
        new HtmlWebpackPlugin({
            chunks: [files[i]],
            title: 'webpack-demo',
            template: path.join(__dirname, '../src/pages/' + files[i] + '/index.html'),
            favicon: path.join(__dirname, '../public/favicon.ico'),
            inject: 'body', // 也可以指定字符串："body" 或 "head"（默认是body最底部，即：true）
            filename: path.join(__dirname, '../dist/') + files[i] + '.html',
        })
    );
}

module.exports = {
    entry: entryInfo,

    mode: 'development',

    output: {
        filename: 'static/js/[chunkhash].js?[hash]',
        path: path.join(__dirname, '../dist'),
        publicPath: '/',
        clean: true,
        chunkFilename: '[name].js',
    },

    plugins: [
        new webpack.ProgressPlugin(),
        ...htmlPluginData,
        new CopyPlugin({
            patterns: [{ from: path.join(__dirname, '../src/assets/js/'), to: path.join(__dirname, '../dist/static/js/') }],
        }),
        new webpack.ProvidePlugin({}),
        new Happypack({
            id: 'js',
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        cacheDirectory: true,
                    },
                },
            ],
        }),
    ],

    module: {
        rules: [
            {
                test: /\.(jpeg|png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            publicPath: '/static/img',
                            outputPath: './static/img',
                            name: '[name].[hash].[ext]?[hash]',
                            esModule: false,
                        },
                    },
                ],
            },
            {
                test: /\.(js|jsx)$/,
                // 不要编译 node_modules 下面的代码
                exclude: path.join(__dirname, '../node_modules'),
                include: path.join(__dirname, '../src'),
                /*use: {
                    loader: 'babel-loader',
                    options: {
                        // 当为 true 时，会启动缓存机制，
                        // 在重复打包未改变过的模块时防止二次编译
                        // 这样做可以加快打包速度
                        cacheDirectory: true,
                    },
                },*/
                use: 'Happypack/loader?id=js', // 开启多线程打包
            },
            {
                test: /\.js$/,
                use: ['eslint-loader'],
            },
            {
                test: /\.ts$/,
                use: ['ts-loader'],
            },
            {
                test: /\.(htm|html)$/,
                use: ['html-withimg-loader'],
            },
        ],
    },

    resolve: {
        alias: {
            '@': path.join(__dirname, '../src/'),
            vue$: 'vue/dist/vue.esm.js',
        },
        extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.ts', '.tsx'],
    },

    resolveLoader: {
        alias: {
            'scss-loader': 'sass-loader', // scss 文件通过sass-loader解析
        },
    },
};
