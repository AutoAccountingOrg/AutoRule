const path = require('path');

module.exports = {
    entry: {
        rule: './src/rule.js',
        test: './src/test.js',
        category: './src/category.js',
    },
    output: {
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
                },
            },
        ],
    },
};
