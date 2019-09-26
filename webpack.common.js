const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ['@babel/polyfill', './src/main.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].[hash:6].build.js',
    publicPath: "/"
  },
  optimization: {
    splitChunks: {
      chunks: 'initial' // initial(初始块)、async(按需加载块)、all(全部块)
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[hash:8].[name].css'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './public/index.html'),
    }),
    new VueLoaderPlugin(),
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js',
      '~': path.join(__dirname, "src"),
    }
  }
}