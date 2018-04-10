const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    entry: __dirname + '/app/main.js',
    output: {
        path: __dirname + '/build',
        filename: 'bundle-[hash].js'
    },
    devtool: 'null',
    devServer: {
        historyApiFallback: true, //不跳转
        inline: true,  //修改刷新
        hot: true //调用webpack热更新
    },
    module: {
        rules:[{
            test:/\.js$/,
            use: {
                loader: 'babel-loader'
            },
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            // use: [
            //     {
            //         loader: "style-loader"
            //     }, {
            //         loader: "css-loader",
            //         options: {
            //             modules: true
            //         }
            //     }, {
            //         loader: "postcss-loader"
            //     }
            // ]
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader",'postcss-loader']
              })
        }]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new ExtractTextPlugin("[name].css"),
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.html'
        }),
        new CleanWebpackPlugin('build/*.*', {
            root: __dirname,
            verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
            dry: false        　　　　　　　　　　//启用删除文件

        })
        // new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.optimize.UglifyJsPlugin(),
        
    ]
}