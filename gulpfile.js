var browserify = require('browserify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var fs = require('fs');
var watchify = require('watchify');
var server = require('http-server');
var less = require('gulp-less');

var files = {
    js: {
        src: 'public/src/index.js',
        dest: 'public/build/index.js'
    },
    css: {
    	src: 'public/index.less',
    	dest: 'public/build'
    }
};

gulp.task('js', function () {
    return browserify(files.js.src)
        .transform('babelify')
        .bundle()
        .pipe(fs.createWriteStream(files.js.dest))
});

gulp.task('css', function () {
	return gulp.src(files.css.src)
		.pipe(less())
		.on('error', function (e) {
			gutil.log(gutil.colors.red(e.message));
			this.emit('end');
		})
		.pipe(gulp.dest(files.css.dest));
});

gulp.task('css-watch', function () {
	gulp.watch(files.css.src, ['css']);
});

gulp.task('server', function (cb) {
	var port = process.env.NODE_PORT || 4444;
	server.createServer().listen(port, cb);
	gutil.log('Server started at ' + gutil.colors.green('http://127.0.0.1:' + port));
});

gulp.task('js-watch', function () {
    var args = watchify.args;
    args.debug = true;
    var bundler = watchify(browserify(files.js.src, args));

    bundler.transform('babelify');
    bundler.on('update', rebundle);

    function onError(e) {
        gutil.log(gutil.colors.red(e.message));
    }

    function rebundle() {
        var start = Date.now();

        return bundler.bundle()
          .on('error', onError)
          .on('end', function () {
              var time = Date.now() - start;
              gutil.log('Building \'' + gutil.colors.green(files.js.src) + '\' in ' + gutil.colors.magenta(time + ' ms'));
          })
          .pipe(fs.createWriteStream(files.js.dest));
    }
    rebundle();
});

gulp.task('dev', ['css', 'js-watch', 'server', 'css-watch']);
