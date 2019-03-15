const common = require('./webpack.common');
const merge = require('webpack-merge');
const path = require('path');

module.exports = merge(common, {
  mode: 'development', // 不压缩代码,加快编译速度
  devtool: 'source-map', // 提供源码映射文件调试使用
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'vue-style-loader',
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
              // indentedSyntax: true  // 支持缩进
            }
          },
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
    overlay: true,
    host: "0.0.0.0",
    contentBase: path.resolve(__dirname, 'dist'),
    proxy: {
      '/api': {
        target: 'https://music.163.com/',
        secure: false,
        changeOrigin: true,
        // pathRewrite: { "^/json": "" }
        // bypass: function (req, res, proxyOptions) {
        //   console.log('---------------');

        //   if (req.headers.accept.indexOf('html') !== -1) {
        //     // return '/index.html';
        //   }
        // }
      }
    }
  },
});