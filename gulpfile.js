const os = require('os');
const gulp = require('gulp');
const zip = require('gulp-zip');

function copyToWidgetsFolder() {
  return gulp.src(['widget/**/*'])
    .pipe(gulp.dest('Library/Application\ Support/Übersicht/widgets/taylor-swift-quote.widget/', { cwd: os.homedir }));
}

function zipIt() {
  return gulp.src('widget/**/*')
    .pipe(zip('taylor-swift-quote.widget.zip'))
    .pipe(gulp.dest('./'))
}

exports.default = copyToWidgetsFolder;
exports.build = zipIt;
