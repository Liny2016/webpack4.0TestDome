// webpack.config.js
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
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
    new CleanWebpackPlugin(['dist'])
  ],
  module: {
    rules: [
    { test: /\.css$/, loader: 'style-loader!css-loader' },
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