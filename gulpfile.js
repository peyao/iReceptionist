// gulpfile.js
var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var bower       = require('gulp-bower');
var nodemon     = require('gulp-nodemon');
var exec        = require('child_process').exec;

gulp.task('nodemon', function(cb) {
    nodemon({
        script: 'app.js',
        ext: 'js',
    });
});

gulp.task('start-server', function(cb) {
    exec('node app.js', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

/**
 * Sass Tasks
 */
gulp.task('sass-app', function() {
    return gulp.src('./client/app/styles/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./client/app/styles'));
});
gulp.task('sass-marketing', function() {
    return gulp.src('./client/marketing/styles/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./client/marketing/styles'));
});
gulp.task('sass-vip', function() {
    return gulp.src('./client/vip/styles/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./client/vip/styles'));
});
gulp.task('sass-auth', function() {
    return gulp.src('./client/auth/styles/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./client/auth/styles'));
});
gulp.task('sass-checkin', function() {
    return gulp.src('./client/checkin/styles/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./client/checkin/styles'));
});
gulp.task('sass-all', [
    'sass-app',
    'sass-marketing',
    'sass-vip',
    'sass-auth',
    'sass-checkin'
]);


/**
 * Bower Tasks
 */
gulp.task('bower-assets', function() {
    return bower({
        cwd: './client/assets',
    });
});
gulp.task('bower-marketing', function() {
    return bower({
        cwd: './client/marketing',
    });
});
gulp.task('bower-all', [
    'bower-assets',
    'bower-marketing',
]);


gulp.task('browser-sync', [], function() {

    // for more browser-sync config options: http://www.browsersync.io/docs/options/
    browserSync.init({

        // watch the following files; changes will be injected (css & images) or cause browser to refresh
        files: ['client/**/*.*'],

        // informs browser-sync to proxy our expressjs app which would run at the following location
        proxy: 'http://localhost:3000',

        // informs browser-sync to use the following port for the proxied app
        // notice that the default port is 3000, which would clash with our expressjs
        port: 4000,

        //Change whether browser will auto open
        open: true,

        // open the proxied app in chrome
        browser: ['google chrome']
    });

	gulp.watch('./client/app/styles/*.scss', ['sass-app']);
	gulp.watch('./client/marketing/styles/*.scss', ['sass-marketing']);
	gulp.watch('./client/vip/styles/*.scss', ['sass-vip']);
	gulp.watch('./client/auth/styles/*.scss', ['sass-auth']);
});


/**
 * 'gulp' : Runs the default dev environment including browser-sync.
 */
gulp.task('default', [
    'sass-all',
    'bower-all',
    'nodemon',
    'browser-sync'
]);

/**
 * 'gulp prod' : Runs the prod environment. TODO: Run without nodemon.
 */
gulp.task('prod', [
    'sass-all',
    'bower-all',
    'start-server']
);
