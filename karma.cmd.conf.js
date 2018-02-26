var path = require('path');

module.exports = function (config) {
  config.set({
    singleRun: true,
    basePath: '',

    // use headless PhantomJS
    browsers: ['PhantomJS2'],
    phantomjsLauncher: {
        // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    },

    // use Jasmine with Sinon for mocking and stubs
    frameworks: ['mocha', 'sinon-chai'],

    // load our single entry point for our tests
    files: [
      'node_modules/babel-polyfill/dist/polyfill.min.js',
      'test/index.js'
    ],

    // preprocess with webpack and our sourcemap loader
    preprocessors: {
      'test/index.js': ['webpack']
    },

    reporters: [
      // https://github.com/mlex/karma-spec-reporter
      'nyan',

      // https://github.com/karma-runner/karma-coverage
      'coverage'
    ],


    // configure webpack within Karma
    webpack: {
      devtool: 'eval',
      module: {
        loaders: [{
          test: /\.spec\.js$/,
          loader: 'babel-loader',
          include: [path.resolve('src'), path.resolve('test')]
        }, {
          test: /\.js$/,
          loader: 'isparta-loader',
          exclude: /\.spec\.js$/,
          include: [path.resolve('src'), path.resolve('test')]
        }, {
          test: /\.html$/,
          loader: 'html'
        }, {
          // Copia a la carpeta del bundle las imágenes relacionadas en html y css
          test: /\.(png|jpg|jpeg|svg|gif)$/,
          loaders: ['file?name=assets/images/[name].[ext]']
        }]
      },
      stats: {
        colors: true
      }
    },
    singleRun: true,

    eslint: {
      emitError: false,
      configFile: path.resolve(__dirname, './.eslintrc')
    },
    // // Mocha Configurations
    client: {
      mocha: {
        reporter: 'html' // change Karma's debug.html to the mocha web reporter
      }
    },

    // configure the webpack server to not be so verbose
    webpackServer: {
      noInfo: true
    },

    webpackMiddleware: {
      stats: {
        colors: true,
        chunks: false
      }
    },
    // // setup code coverage
    coverageReporter: {
      reporters: [{
        type: 'text-summary',
      }, {
        type: 'html',
        dir: 'coverage/'
      }]
    },

  });
};
