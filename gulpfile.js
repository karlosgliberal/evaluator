var gulp = require('gulp');
var notify = require('gulp-notify');
var karma = require('karma');
var sass = require('gulp-sass');
var shell = require('gulp-shell');

// need this to prevent the pipe from breaking on errors, and continue
// watching files for changes.
var plumber = require('gulp-plumber');

var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');

gulp.task('webpack', shell.task([
  './node_modules/.bin/webpack --progress --colors --config webpack.config.js'
]));

// copies our `src/assets` folder into `www`
gulp.task('copy-assets', function () {
  gulp.src('./src/assets/**/*', { base: 'src' })
    .pipe(gulp.dest('./www'));
});

gulp.task('scss', function () {
  return gulp.src('./src/scss/app.scss')
    .pipe(plumber())
    .pipe(sass().on('error', notify.onError({
      message: '<%= error.message %>',
      title: 'SCSS Compilation Errror'
    })))
    .pipe(gulp.dest('./www'));
});

gulp.task('tdd', function (cb) {
  var server = new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, cb);
  server.start();
});

gulp.task('test', function (cb) {
  var server = new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, cb);
  server.start();
});

var webpackCmdConfig = require('./webpack.cmd.config.js');
gulp.task('test_cmd', function (cb) {
  return gulp.src('./src/app/app.js')
  .pipe(webpack(webpackCmdConfig), null, function (err, stats) {
    console.log(stats);
  })
  .pipe(gulp.dest('./www'));
});

// we just need a watch for scss. webpack watches everything else.
gulp.task('watch', function () {
  gulp.watch('./src/**/*.scss', ['scss']);
  gulp.watch('./src/**/*.js', ['webpack']);
  gulp.watch('./src/**/*.html', ['webpack']);
});

// @TODO
// production build

gulp.task('default', ['webpack', 'scss', 'copy-assets']);
