'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import notify from 'gulp-notify';
import sassLint from 'gulp-sass-lint'

const paths = {
  sass: './src/sass/**/*.scss',
  cssDest: './',
  es6: './src/jss/',
  jsDest: './js/'
};

gulp.task('compile:sass', () => {
  return gulp.src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.cssDest))
    .pipe(notify("SASS compiling done"));
});

gulp.task('lint:sass', () => {
  return gulp.src(paths.sass)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

gulp.task('watch', function(){
  gulp.watch(paths.sass, ['compile:sass', 'lint:sass']);
})

gulp.task('default', ['compile:sass', 'lint:sass', 'watch']);
