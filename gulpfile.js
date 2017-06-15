const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const inject = require('gulp-inject-string');
const UglifyJS = require("uglify-js");
const fs = require('fs');

gulp.task('default', function() {
	fs.readFile('./index.js', 'utf8', function (err, data) {
		if (err) {
			throw err;
		}
		// console.log(data);
		var options = {
			warnings: true,
			compress: {
				loops: true,
				drop_console: false,
				properties: true
			}
		};
		var result = UglifyJS.minify(data, options);
		if (result.error) {
			throw result.error;
		}
		// console.log(result.code);
		gulp.src([
			'./node_modules/resource-loader/dist/resource-loader.min.js',
			'./node_modules/once-document-is-ready/dist/once-document-is-ready.min.js',
			'./node_modules/nanobar/nanobar.min.js'
		])
			.pipe(concat('ladderized.min.js'))
			.pipe(inject.append(result.code))
			// .pipe(rename('ladderized.min.js'))
			.pipe(gulp.dest('./dist/'));
	});
});

/*
	Notes:
		- rename isn't currently used.
*/
