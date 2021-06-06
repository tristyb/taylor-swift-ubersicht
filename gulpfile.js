const os = require('os');
const gulp = require('gulp');

function copyToWidgetsFolder() {
  return gulp.src(['widget/**/*'])
    .pipe(gulp.dest('Library/Application\ Support/Übersicht/widgets/taylor-swift-quote.widget/', { cwd: os.homedir }));
}

exports.default = copyToWidgetsFolder
