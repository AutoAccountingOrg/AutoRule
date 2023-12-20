const path = require('path');

module.exports = {
    target: ['web', 'es5'],
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
                test: /\.txt$/,
                use: 'raw-loader',
            },
        ],
    },
};
