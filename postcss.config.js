/**
 * @Descripttion: postcss.config
 * @version: 1.0.0
 * @Author: zf
 * @Date: 2021-08-13 15:13:41
 * @LastEditors: zf
 * @LastEditTime: 2021-08-13 15:13:41
 */
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
    plugins: [
        postcssPresetEnv({
            state: 3,
            features: {
                'color-mod-function': {
                    unresolved: 'warn',
                },
                browsers: 'last 2 versions',
            },
        }),
    ],
};
