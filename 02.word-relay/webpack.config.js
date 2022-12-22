const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: {
    app: ['./client']
  },
  module: {
    rules: [{
      test: /\.jsx?/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
            targets: {
              browsers: ['> 5% in KR'],
            },
            debug: true,
          }],
          '@babel/preset-react'
        ],
        plugins: ['react-refresh/babel',]
      },
    }]
  },
  plugins: [
    new RefreshWebpackPlugin(),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist/',
  },
  devServer: {
    devMiddleware: { publicPath: '/dist/' }, // 결과물 저장
    static: { directory: path.resolve(__dirname) },
    hot: true, // 변경 점을 체크 결과물을 수정
  }

}