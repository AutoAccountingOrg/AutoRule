const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');


module.exports = {
    target: ['web', 'es5'],
    entry: {
        rule: './src/rule.js',
        test: './src/test.js',
        category: './src/category.js',
    },
    output: {
       // libraryTarget: 'global',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },

    module: {

        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.txt$/,
                use: 'raw-loader',
            },
        ],
    },
    mode: 'production', // 确保在生产模式下，以启用压缩功能
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        semicolons: true, // 强制使用分号
                    },
                    mangle: false, // 关闭代码改名
                    // 确保不启用某些压缩选项，以防止可能的语法转换
                    compress: {
                        defaults: false, // 关闭默认压缩选项
                    }
                },
            }),
        ],
    },
};
