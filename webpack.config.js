const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const mode = process.env.NODE_ENV || 'development'
module.exports = {
  mode,
  optimization: {
        splitChunks: {//分离第三方库,避免重复打包
            chunks: 'all'
        },
      //  runtimeChunk: true,
  },
  devtool: 'inline-source-map',
  entry: {
    index : './src/index.js',
    other : './src/other.js'
  },
  output: {
    filename: '[name]-[hash]-bundle.js',
    path: path.resolve(__dirname, 'dist')
  }, 
  plugins: [
    new webpack.HotModuleReplacementPlugin(),//热更新HRM
    new webpack.BannerPlugin('版权所有，翻版必究'),

    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'webpack4'
    }), 
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin({ filename: '[name].css', allChunks: true }), 
  ],
  module: {
    rules: [
     {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader',
      }),
    },
    { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }, // inline base64 URLs for <=8k 
    { //编译HTML中的url
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }],
      }
    ]
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    inline: true
  }
 
};
