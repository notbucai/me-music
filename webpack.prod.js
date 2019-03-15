
const common = require('./webpack.common');
const merge = require('webpack-merge');
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
            loader: 'sass-loader',
            options: {
              // indentedSyntax: true
            }
          }
        ],
      },
      {
        test: /\.(jpg|gif|svg|png)$/,
        use: [
          'url-loader?limit=4096&name=images/[hash:8].[name].[ext]',
        ],
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    overlay: true
  },
});