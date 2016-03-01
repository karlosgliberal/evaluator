var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// const hashPostfix = options.useHash ? '.[hash]' : '';
// const imagesLoaders = [
//   `file?name=[path][name]${hashPostfix}.[ext]`
// ];

module.exports = {
  watch: true,

  eslint: {
    configFile: '.eslintrc'
  },

  entry: [
    './src/app/app.js'
  ],

  output: {
    path: __dirname + '/www',
    filename: 'app.js'
  },

    // use inline source maps.
  devtool: 'cheap-module-source-map',

  module: {
    loaders: [{
      test: /\.js?$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      exclude: /node_modules/,
      loaders: ['ng-annotate', 'babel-loader']
    }, {
      test: /\.js$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      loader: 'eslint-loader',
      exclude: /node_modules/
    }, {
      test: /\.html$/,
      loader: 'html'
    }]
  },
  resolve: {
    root: [
      path.join(__dirname, 'node_modules')
    ],
    extensions: ['', '.js']
  },
  eslint: {
    configFile: path.resolve(__dirname, './.eslintrc')
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      // load our index.html "template"
      template: './src/index.html',

      // inject all scripts into the body
      inject: 'body',
      filename: 'index.html'
    })
  ]
};
