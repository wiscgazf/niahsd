const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        vendors: ['react', 'react-dom'],
        commons: ['lodash'],
    },

    mode: 'production',

    output: {
        path: path.resolve(__dirname, 'dll'),
        filename: '[name].dll.js',
        libraryTarget: 'var',
        library: '_dll_[name]',
    },

    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname, 'dll', '[name].manifest.json'),
            name: '_dll_[name]',
        }),
    ],
};
