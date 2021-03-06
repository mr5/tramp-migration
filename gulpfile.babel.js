const gulp = require('gulp');
const path = require('path');
const babel = require('gulp-babel');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');

const paths = {
  es6: ['./src/**/*.js'],
  es5: './build',
  sourceRoot: path.join(__dirname, 'src')
};

gulp.task('build', () => {
  gulp.src(['./src/**/*.json', './src/**/*.sql', './src/**/*.stub']).pipe(gulp.dest('./build'));
  return gulp
    .src(paths.es6)
    .pipe(sourceMaps.init())
    .pipe(babel(JSON.parse(fs.readFileSync(`${__dirname}/.babelrc`))))
    .pipe(sourceMaps.write('.', {
      includeContent: false,
      sourceRoot: paths.sourceRoot
    }))
    .pipe(gulp.dest(paths.es5));
});
