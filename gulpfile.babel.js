'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import notify from 'gulp-notify';
import sassLint from 'gulp-sass-lint';
import del from 'del';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import webpackConfig from './webpack.config.js';

const paths = {
  sass: './src/sass/**/*.scss',
  webpackIndex: './src/js/index.js',
  jsDest: './js/'
};

gulp.task('compile:sass', () => {
  return gulp.src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./'))
    .pipe(notify({ message: 'TASK: "compile:sass" Completed!', onLast: true }));
});

gulp.task('lint:sass', () => {
  return gulp.src(paths.sass)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

gulp.task('compile:js', () => {
  gulp.src(paths.webpackIndex)
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest(paths.jsDest))
    .pipe(notify({ message: 'TASK: "compile:js" Completed!', onLast: true }));
});

gulp.task('clean', () => {
  return del([
    './style.css',
    `${paths.jsDest}/*`,
  ]);
});

gulp.task('watch', function(){
  gulp.watch(paths.sass, ['compile:sass', 'lint:sass']);
  gulp.watch(paths.webpackIndex, ['compile:js']);
})

gulp.task('default', ['clean', 'compile:sass', 'lint:sass', 'compile:js', 'watch']);
