'use strict';
var pkg = require('./package.json'),
  browserify = require('browserify'),
  stringify = require('stringify'),
  buffer = require('vinyl-buffer'),
  concat = require('gulp-concat'),
  del = require('del'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  header = require('gulp-header'),
  jshint = require('gulp-jshint'),
  karma = require('karma'),
  ghpages = require('gh-pages'),
  path = require('path'),
  rename = require('gulp-rename'),
  replace = require('gulp-replace'),
  source = require('vinyl-source-stream'),
  uglify = require('gulp-uglify');

gulp.task('default', ['clean', 'lint', 'test', 'compile']);
gulp.task('dev', ['compile', 'lint', 'test', 'watch']);

gulp.task('watch', function () {
  gulp.watch('lib/**/*.js', ['test', 'lint', 'compile']);
  gulp.watch('test/spec/**/*.js', ['test']);
});

gulp.task('clean', function () {
  return del(['dist', 'test/coverage']);
});

gulp.task('lint', function () {
  return gulp.src(['gulpfile.js', 'lib/**/*.js', 'specs/**/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', function (done) {
  new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('compile', ['clean'], function () {
  return browserify('lib/bespoke-auto-play.js', { standalone: 'bespoke.plugins.autoPlay' })
    .transform(stringify, {
      appliesTo: { includeExtensions: ['.css'] },
      global: true
    })
    .bundle()
    .pipe(source('bespoke-auto-play.js'))
    .pipe(buffer())
    .pipe(header([
      '/*!',
      ' * <%= name %> v<%= version %>',
      ' *',
      ' * Copyright <%= new Date().getFullYear() %>, <%= author.name %>',
      ' * This content is released under the <%= license %> license',
      ' */\n\n'
    ].join('\n'), pkg))
    .pipe(gulp.dest('dist'))
    .pipe(rename('bespoke-auto-play.min.js'))
    .pipe(uglify())
    .pipe(header([
      '/*! <%= name %> v<%= version %> ',
      '© <%= new Date().getFullYear() %> <%= author.name %>, ',
      '<%= license %> License */\n'
    ].join(''), pkg))
    .pipe(gulp.dest('dist'));
});

gulp.task('compile:demo', ['compile:demo:css', 'compile:demo:html', 'compile:demo:js']);

gulp.task('compile:demo:css', ['clean'], function() {
  return gulp.src('demo/style.css')
    .pipe(gulp.dest('demo/dist'));
});

gulp.task('compile:demo:html', ['clean'], function() {
  return gulp.src('demo/index.html')
    .pipe(replace(/<\/article>[\s\S]*?<script src="demo.js"><\/script>/, '</article>\n<script src="build.js"></script>'))
    .pipe(gulp.dest('demo/dist'));
});

gulp.task('compile:demo:js', ['compile'], function() {
  return gulp.src([
    'node_modules/bespoke/dist/bespoke.js',
    'node_modules/bespoke-bullets/dist/bespoke-bullets.js',
    'node_modules/bespoke-nav/dist/bespoke-nav.js',
    'demo/demo.js'
  ])
    .pipe(concat('build.js'))
    .pipe(uglify())
    .pipe(gulp.dest('demo/dist'));
});

gulp.task('deploy', ['compile:demo'], function(done) {
  ghpages.publish(path.join(__dirname, 'demo/dist'), { logger: gutil.log }, done);
});
