const { src, dest, series } = require('gulp');
const minify = require('gulp-minify');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const minifyCSS = require('gulp-minify-css');

function js() {
  return src('toaster.js', { allowEmpty: true })
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('release'));
}

function css() {
  return src('toaster.css')
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('release'));
}

exports.default = series([js, css]);
