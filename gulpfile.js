// gulpfile.js
var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var bower = require('gulp-bower');
var nodemon = require('gulp-nodemon');

gulp.task('nodemon', function(cb) {
    nodemon({
        script: 'app.js',
        ext: 'js',
    });
});

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

gulp.task('bower-app', function() {
    return bower({
        cwd: './client/app',
    });
});
gulp.task('bower-marketing', function() {
    return bower({
        cwd: './client/marketing',
    });
});
gulp.task('bower-vip', function() {
    return bower({
        cwd: './client/app',
    });
});

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
});

gulp.task('default', [
    'sass-app',
    'sass-marketing',
    'sass-vip',
    'bower-app',
    'bower-marketing',
    'bower-vip',
    'nodemon',
    'browser-sync'
]);
