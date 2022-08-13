const path = require('path')
const HtmlWebpackPugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'autograph.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
    library: {
      name: 'autograph',
      type: 'umd'
    },
    globalObject: 'globalThis'
  },
  devServer: {
    static: './dist',
    port: 3000
  },

  plugins: [
    new HtmlWebpackPugin({
      filename: 'app.html',
      template: './index.html',
      inject: 'body'
    })
  ],

  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use:[
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  }
}