'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';

const paths = {
  sass: './src/sass/**/*.scss',
  cssDest: './',
  es6: './src/jss/',
  jsDest: './js/'
};

gulp.task('sass', () => {
  return gulp.src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.cssDest));
});

gulp.task('watch', function(){
  gulp.watch(paths.sass, ['sass']);
})

gulp.task('default', ['sass', 'watch']);
