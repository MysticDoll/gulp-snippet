var gulp = require('gulp');
var notify = require('gulp-notify');
var buffer = require('gulp-buffer');
var browserify = require('browserify');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');
var errHandler = function(){
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: "Compile Error",
    message: "<%= error %>"
  }).apply(this, args);

  this.emit('end');
};

gulp.task('build', function () {
  browserify(
        { entries: ['./src/index.coffee'],
          extensions: ['.coffee', '.js'],
          debug: true
        })
  .transform('coffeeify')
  .bundle()
  .on('error', errHandler)
  .pipe(source('main.js'))
  .pipe(buffer())
  .pipe(gulp.dest('./dest'))
  .pipe(uglify())
  .pipe(rename({suffix:'.min'}))
  .pipe(gulp.dest('./dest'));
});

gulp.task('server', function(){
  gulp.src('dest')
    .pipe(webserver({
      livereload: true,
      https: true,
      open: true
    }));
});

gulp.task('watch',['server'], function(){
  gulp.watch('./src/*.coffee',['build']);
  gulp.watch('./src/**/*.coffee',['build']);
});

gulp.task('default', ['build', 'watch', 'server']);
