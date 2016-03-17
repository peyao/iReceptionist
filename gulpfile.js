// gulpfile.js
var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var bower       = require('gulp-bower');
var nodemon     = require('gulp-nodemon');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
var annotate  = require('gulp-ng-annotate');
var rename      = require('gulp-rename');
var exec        = require('child_process').exec;
var karmaServer = require('karma').Server;

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
gulp.task('sass-assets', function() {
    return gulp.src('./client/assets/styles/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./client/assets/styles'));
});
gulp.task('sass-all', [
    'sass-app',
    'sass-marketing',
    'sass-vip',
    'sass-auth',
    'sass-checkin',
    'sass-assets',
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

// path
var jsApp      = './client/app/**/*.js',
    jsAuth     = './client/auth/**/*.js',
    jsCheckIn  = './client/checkin/**/*.js',
    jsVIP      = './client/vip/**/*.js',
    jsAssets   = './client/assets/services/*.js',
    //jsMins     = ['/client/assets/vendor/js/**/*.js',
    //    '/client/assets/bower_components/**/*.min.js',
    //    '/client/assets/bower_components/angular-ui-router-anim-in-out/anim-in-out.js'],
    jsAuthMins     = ['./client/assets/bower_components/angular/*.min.js',
        './client/assets/bower_components/angular-ui-router/**/*.min.js',
        './client/assets/bower_components/angular-animate/*.min.js',
        './client/assets/bower_components/angular-cookies/*.min.js',
        './client/assets/bower_components/angular-resource/*.min.js',
        './client/assets/bower_components/angular-sanitize/*.min.js',
        './client/assets/bower_components/angular-aria/*.min.js',
        './client/assets/bower_components/angular-bootstrap/*.min.js',
        './client/assets/bower_components/angular-ui-router-anim-in-out/*.js',
        './client/assets/bower_components/lodash/*.min.js',
        './client/assets/bower_components/cloudinary-core/*.min.js',
        './client/assets/bower_components/angular-route/*.min.js',
        './client/assets/bower_components/cloudinary_ng/js/*.js'
    ],
    jsAppMins   = ['./client/assets/bower_components/angular/*.min.js',
        './client/assets/bower_components/angular-ui-router/**/*.min.js',
        './client/assets/bower_components/angular-animate/*.min.js',
        './client/assets/bower_components/angular-cookies/*.min.js',
        './client/assets/bower_components/angular-resource/*.min.js',
        './client/assets/bower_components/angular-sanitize/*.min.js',
        './client/assets/bower_components/angular-aria/*.min.js',
        './client/assets/bower_components/angular-bootstrap/*.min.js',
        './client/assets/bower_components/angular-ui-router-anim-in-out/*.js',
        './client/assets/bower_components/toastr/*.min.js',
        './client/assets/bower_components/pusher/dist/*.min.js',
        './client/assets/bower_components/loading-bar/*.min.js',
        './client/assets/bower_components/lodash/*.min.js',
        './client/assets/bower_components/cloudinary-core/*.min.js',
        './client/assets/bower_components/angular-route/*.min.js',
        './client/assets/bower_components/cloudinary_ng/js/*.js'
    ],
    jsDest     = './client/auth/dist/';

/**
 * Concat
 */
// Concatenate the .min.js files in assets/bower_componenets
// Concat the .min.js files in assets/vendor/js/vendor/
gulp.task('concat-min', function() {
    return gulp.src(jsAuthMins)
        .pipe(concat('dist.js'))
        .pipe(gulp.dest(jsDest));
})

//gulp.task('uglify-app', function() {
//    return gulp.src([jsApp, jsAssets])
//        .pipe(uglify({
//            mangle: false
//        }))
//        .pipe(gulp.dest(jsDest+'app'));
//})
//gulp.task('concat-app', function() {
//    return gulp.src([jsDest+'app', jsMins])
//        .pipe(concat('dist.js'))
//        .pipe(gulp.dest(jsDest+'app'));
//})
//
//gulp.task('uglify-auth', function() {
//    return gulp.src([jsAuth, jsAssets])
//        .pipe(annotate())
//        .pipe(uglify())
//        .pipe(gulp.dest(jsDest+'auth'));
//})
//gulp.task('concat-auth', function() {
//    return gulp.src([jsDest+'auth', jsMins])
//        .pipe(concat('dist.js'))
//        .pipe(gulp.dest(jsDest+'auth'));
//})
//
//gulp.task('uglify-checkin', function() {
//    return gulp.src([jsCheckIn, jsAssets])
//        .pipe(annotate())
//        .pipe(uglify())
//        .pipe(gulp.dest(jsDest+'checkin'));
//})
//gulp.task('concat-checkin', function() {
//    return gulp.src([jsDest+'checkin', jsMins])
//        .pipe(concat('dist.js'))
//        .pipe(gulp.dest(jsDest+'checkin'));
//})
//
//gulp.task('uglify-vip', function() {
//    return gulp.src([jsVIP, jsAssets])
//        .pipe(annotate())
//        .pipe(uglify())
//        .pipe(gulp.dest(jsDest+'vip'));
//})
//gulp.task('concat-vip', function() {
//    return gulp.src([jsDest+'vip', jsMins])
//        .pipe(concat('dist.js'))
//        .pipe(gulp.dest(jsDest+'vip'));
//})

gulp.task('minify-all', [
    'concat-min']
    //'uglify-app',
    //'concat-app',
    //'uglify-auth',
    //'concat-auth',
    //'uglify-checkin',
    //'concat-checkin',
    //'uglify-vip',
    //'concat-vip']
);


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
	gulp.watch('./client/assets/styles/*.scss', ['sass-assets']);
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
 * 'gulp setup' : Do the sass and bower tasks
 */
gulp.task('setup', [
    'sass-all',
    'bower-all',
    'minify-all']
);

/**
 * 'gulp test' : Run Karma tests.
 */
 gulp.task('test', function(done) {
     new karmaServer({
         configFile: __dirname + '/karma.conf.js',
         singleRun: false
     }, done).start();
 });

/**
 * 'gulp dev' : Runs the production environment.
 */
gulp.task('dev', [
    'setup',
    'start-server']
);

/**
 * 'gulp prod' : Runs the production environment.
 */
gulp.task('prod', [
    'setup',
    'start-server']
);
