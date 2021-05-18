const path = require( 'path' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' )
const CopyPlugin = require( 'copy-webpack-plugin' )

module.exports = {
    entry: {
        main: path.resolve( __dirname, './src/index.js' )
    },
    output: {
        path: path.resolve( __dirname, './dist' ),
        filename: '[name].bundle.[hash].js'
    },
    plugins: [
        new HtmlWebpackPlugin( {
            template: path.resolve( __dirname, './src/index.html' ),
            filename: 'index.html'
        } ),
        new CleanWebpackPlugin(),
        new CopyPlugin( {
            patterns: [
                { from: './src/assets', to: 'assets' }
            ]
        } )
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/preset-env' ]
                    }
                }
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(scss|css)$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            }
        ]
    }
}