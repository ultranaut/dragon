/* jshint node: true */

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');

var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

var sass = require('gulp-sass');

var config = {
  jsFilesSrc: 'js/src/**/*.js',
  jsFilesDest: 'js/',
  jsHintRules: [],

  cssFilesSrc: 'css/sass/**/*.scss',
  cssFilesDest: 'css/',
  sassConfig: {
    outputStyle: 'compressed'
    }
};

/* --- javascript -------------------------------------------------- */
gulp.task('js-hint', function () {
  gulp.src(config.jsFilesSrc)
      .pipe(plumber())
      .pipe(jshint(config.jsHintRules))
      .pipe(jshint.reporter('jshint-stylish'))
      .pipe(jshint.reporter('fail'))
      .on('error', notify.onError({ message: 'mistakes were made.' }));
});

gulp.task('minify', function () {
  gulp.src(config.jsFilesSrc)
      .pipe(plumber())
      .pipe(uglify())
      .pipe(gulp.dest(config.jsFilesDest))
      .pipe(livereload());
});

gulp.task('javascript', ['js-hint', 'minify']);
// gulp.task('javascript', function () {
//   gulp.src('js/*.js')
//       .pipe(livereload());
// });


/* --- css --------------------------------------------------------- */
gulp.task('css', function () {
  gulp.src(config.cssFilesSrc)
      .pipe(plumber())
      .pipe(sass(config.sassConfig))
      .pipe(gulp.dest(config.cssFilesDest))
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
  gulp.watch(config.jsFilesSrc, ['javascript']);
  // gulp.watch('js/*.js', ['javascript']);
  gulp.watch(config.cssFilesSrc, ['css']);
  gulp.watch('./*.html', ['html']);

});


/* --- main -------------------------------------------------------- */
gulp.task('default', ['javascript', 'css', 'html', 'watch']);
