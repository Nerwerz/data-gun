const path = require('path');

module.exports = {
  output: {
    publicPath: path.resolve(__dirname, '/public')
  },
  devServer: {
    contentBase: path.join(__dirname, '/public'),
    compress: true,
    port: 9000
  }
}


