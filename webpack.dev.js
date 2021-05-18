const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common,{
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        contentBase: ('./dist'),
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },
})