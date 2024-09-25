const dotEnv = require('dotenv-webpack');
module.exports = {
  entry: './src/index.js',
  output: {
    // path: __dirname + '/build',
    path: __dirname + process.env.BUILD_DIR,
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    static: {
      directory: "./public"
    },
    compress: false,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
	plugins: [new dotEnv({ systemvars: true })]
};
