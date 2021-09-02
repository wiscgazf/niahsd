const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 读取dir
const readDir = (dirPath) => fs.readdirSync(path.resolve(__dirname, dirPath));

// 多入口配置
const entryInfo = () => {
    const files = readDir('../src/pages/');
    let obj = {};
    for (let i = 0; i < files.length; i++) {
        obj[files[i]] = path.resolve(__dirname, '../src/pages/' + files[i] + '/index.js');
    }
    return obj;
};

// htmlPlugins
const htmlPluginData = () => {
    const files = readDir('../src/pages/');
    return files.map((item) => {
        return new HtmlWebpackPlugin({
            chunks: [item],
            title: 'webpack-demo',
            template: path.resolve(__dirname, '../src/pages/' + item + '/index.html'),
            favicon: path.resolve(__dirname, '../public/favicon.ico'),
            inject: 'body', // 也可以指定字符串："body" 或 "head"（默认是body最底部，即：true）
            filename: path.join(__dirname, '../dist/') + item + '.html',
        });
    });
};

// 读取dll文件包 js | json
const dllFiles = (patten = /\.manifest.json$/) => {
    const matchVal = readDir('../dll/').filter((item) => patten.test(item));
    if (/\.manifest.json$/.test(matchVal[0])) {
        return matchVal.map((item) => {
            return new webpack.DllReferencePlugin({
                manifest: require(path.join(__dirname, `../dll/${item}`)),
            });
        });
    }
    if (/\.js$/.test(matchVal[0])) {
        return matchVal.map((item) => `dll/${item}`);
    }
};

module.exports = {
    entryInfo,
    htmlPluginData,
    dllFiles,
};
