let path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: '/',
    filename: 'diff.js'
  },
  devServer: {
    port: '8080',
    contentBase: 'www',
    open: true  
  }
}