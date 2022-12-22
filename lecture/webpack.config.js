const path = require('path'); // 경로를 쉽게 설정하기 위함

module.exports = {
  name: 'word-relay-setting',
  mode: 'development', // 개발용, 실서비스에서는 production
  devtool: 'eval', // 빠르게
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  // 중요
  entry: {
    app: ['./client'],
  }, // 입력

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
      },
    }]
  },
  plugins: [],
  output: {
    path: path.join(__dirname, 'dist'), // __dirname: 현재 폴더 경로,
    filename: 'app.js',
  }, // 출력
}