
const common = require('./webpack.common');
const merge = require('webpack-merge');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production', // 压缩代码
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.css$|\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 开启 CSS Modules
              modules: true,
            }
          },
          'css-loader',
          {
            loader: 'px2rem-loader',
            // options here
            options: {
              remUnit: 65,
              remPrecision: 6,
            }
          },
          {
            loader: 'sass-loader',
            options: {
              // indentedSyntax: true
            }
          }
        ],
      },
      {
        test: /\.(jpg|gif|svg|png|jpeg)$/,
        use: [
          'url-loader?limit=4096&name=images/[hash:8].[name].[ext]',
        ],
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    overlay: true
  },
});