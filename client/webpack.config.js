module.exports = {
    entry: './src/index.js',
    output: {
      path: __dirname + '/build',
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
      }
    ]
  },
};