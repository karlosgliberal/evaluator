var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

//imagesLoaders.push('image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}');
module.exports = {
  watch: true,

  entry: [
    './src/app/app.js',
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
    }, {
      // Copia a la carpeta del bundle las imágenes relacionadas en html y css
      test: /\.(png|jpg|jpeg|svg|gif)$/,
      loaders: ['file?name=assets/images/[name].[ext]']
    }
  ]
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
