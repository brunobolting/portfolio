const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const postcss = require('gulp-postcss');
const clean_css = require('gulp-clean-css');
const autoprefixer = require('autoprefixer');
// const rev = require('gulp-rev');
const del = require('del');
const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');

function javasript() {
  return (
    src(['src/js/*.js'])
      .pipe(concat('script.js'))
      .pipe(
        babel({
          presets: ['@babel/preset-env']
        })
      )
      .pipe(
        minify({
          ext: {
            min: '.js'
          },
          noSource: true
        })
      )
      // .pipe(rev())
      .pipe(dest('dist/js'))
  );
  // .pipe(
  //   rev.manifest('dist/manifest/rev-manifest.json', {
  //     merge: true
  //   })
  // )
  // .pipe(dest('./'));
}

function css() {
  return (
    src([
      'src/css/settings/*.css',
      'src/css/generic/*.css',
      'src/css/base/*.css',
      'src/css/settings/*.css',
      'src/css/components/*.css',
      'src/css/objects/*.css'
    ])
      .pipe(concat('stylesheet.css'))
      .pipe(postcss([autoprefixer()]))
      .pipe(clean_css())
      // .pipe(rev())
      .pipe(dest('dist/css'))
  );
  // .pipe(
  //   rev.manifest('dist/manifest/rev-manifest.json', {
  //     merge: true
  //   })
  // )
  // .pipe(dest('./'));
}

function html() {
  return src(['src/*.html'])
    .pipe(htmlmin({ collapseWhitespace: false }))
    .pipe(dest('dist/'));
}

function cleanCSS(param) {
  return del('dist/css/*.css');
}

function cleanJS(param) {
  return del('dist/js/*.js');
}

function cleanHTML(param) {
  return del('dist/*.html');
}

exports.live = () => {
  watch('src/css/**/*.css', series(cleanCSS, css));
  watch('src/js/**/*.js', series(cleanJS, javasript));
  watch('src/*.html', series(cleanHTML, html));
};

exports.default = series(cleanJS, cleanCSS, cleanHTML, javasript, css, html);
