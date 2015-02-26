/* jshint node: true */

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');

var jshint = require('gulp-jshint');
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

  /* --- javascript -------------------------------------------------- */
  gulp.task('lint', function () {
    'use strict';
    gulp.src(config.js.src)
        .pipe(plumber())
        .pipe(jshint(config.jsHintRules))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .on('error', notify.onError({
          message: 'There were lint errors.'
        }));
  });

  gulp.task('minify', function () {
    gulp.src(config.js.src)
        .pipe(plumber())
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest(config.js.dest))
        .pipe(livereload());
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
      .pipe(livereload());
});

/* --- html -------------------------------------------------------- */
gulp.task('html', function () {
  gulp.src('./*.html')
      .pipe(plumber())
      .pipe(livereload());
});


/* --- watch ------------------------------------------------------- */
gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(config.js.src, ['javascript']);
  // gulp.watch('js/*.js', ['javascript']);
  gulp.watch(config.css.src, ['css']);
  gulp.watch('./*.html', ['html']);

});


/* --- main -------------------------------------------------------- */
gulp.task('default', ['javascript', 'css', 'html', 'watch']);
