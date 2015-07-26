/* jshint node: true */
'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');

var lint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');

var sass = require('gulp-sass');

var config = {
  js: {
    src: 'js/src/**/*.js',
    dest: 'js/',
    jsHintRules: []
    },

  css: {
    src: 'css/sass/**/*.scss',
    dest: 'css/',
    sassConfig: {
      outputStyle: 'compressed'
      }
    }
  };

gulp.task('connect', function () {
  connect.server({
    root: '.',
    port: 8000,
    livereload: true
  });
});

/* --- javascript -------------------------------------------------- */
gulp.task('lint', function () {
  gulp.src(config.js.src)
    .pipe(plumber())
    .pipe(lint())
    .pipe(lint.formatEach())
    .pipe(connect.reload());
});

gulp.task('minify', function () {
  gulp.src(config.js.src)
    .pipe(plumber())
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(config.js.dest))
    .pipe(connect.reload());
});

gulp.task('javascript', ['lint', 'minify']);
  // gulp.task('javascript', function () {
  //   gulp.src('js/*.js')
  //       .pipe(livereload());
  // });


  /* --- css --------------------------------------------------------- */
gulp.task('css', function () {
  gulp.src(config.css.src)
    .pipe(plumber())
    .pipe(sass(config.css.sassConfig))
    .pipe(gulp.dest(config.css.dest))
    .pipe(connect.reload());
});

/* --- html -------------------------------------------------------- */
gulp.task('html', function () {
  gulp.src('./*.html')
      .pipe(plumber())
      .pipe(connect.reload());
});


/* --- watch ------------------------------------------------------- */
gulp.task('watch', function () {
  gulp.watch(config.js.src, ['javascript']);
  // gulp.watch('js/*.js', ['javascript']);
  gulp.watch(config.css.src, ['css']);
  gulp.watch('./*.html', ['html']);

});


/* --- main -------------------------------------------------------- */
gulp.task('default', ['connect', 'javascript', 'css', 'html', 'watch']);
