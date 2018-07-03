const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';

// const extractPlugin = new ExtractTextPlugin({
//     filename: './docs/ext/[name].css',
// });

module.exports = {
    entry: './src/js/index.jsx',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'docs/js'),
        publicPath: 'docs/js',
    },

    devtool: 'source-map',

    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            },
            {
                test: /\.scss$/,
                use: [
                    devMode ? 'style-loader' : 
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 2 }},
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    browsers: ['last 6 versions'],
                                })
                            ]
                        }
                    },
                    'sass-loader',
                ]
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "../css/[name].css",
            chunkFilename: "[id].css"
        })
    ],

    resolve: {
        extensions: ['.js', '.jsx'],
    }
};