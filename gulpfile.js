// gulpfile.js
var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var bower       = require('gulp-bower');
var nodemon     = require('gulp-nodemon');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
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
<<<<<<< HEAD
var jsApp      = './client/app/**/*.js',
    jsAuth     = './client/auth/**/*.js',
    jsCheckIn  = './client/checkin/**/*.js',
    jsVIP      = './client/vip/**/*.js',
    jsAssets   = './client/assets/services/*.js',
    jsMins     = './client/**/*.min.js',
=======
var jsFiles    = ['./client/**/*.js', '!./client/**/bower_components/'],
    jsAllFiles = './client/**/*.js',
>>>>>>> d4a93bdaabcb0d000f99342e0af6efaadabe7208
    jsDest     = './dist/';

/**
 * Concat
 */
<<<<<<< HEAD
gulp.task('uglify-app', function() {
    return gulp.src([jsApp, jsAssets])
        .pipe(uglify())
        .pipe(gulp.dest(jsDest+'app'));
})
gulp.task('concat-app', function() {
    return gulp.src([jsDest+'app', jsMins])
        .pipe(concat('dist.js'))
        .pipe(gulp.dest(jsDest+'app'));
})

gulp.task('uglify-auth', function() {
    return gulp.src([jsAuth, jsAssets])
        .pipe(uglify())
        .pipe(gulp.dest(jsDest+'auth'));
})
gulp.task('concat-auth', function() {
    return gulp.src([jsDest+'auth', jsMins])
        .pipe(concat('dist.js'))
        .pipe(gulp.dest(jsDest+'auth'));
})

gulp.task('uglify-checkin', function() {
    return gulp.src([jsCheckIn, jsAssets])
        .pipe(uglify())
        .pipe(gulp.dest(jsDest+'checkin'));
})
gulp.task('concat-checkin', function() {
    return gulp.src([jsDest+'checkin', jsMins])
        .pipe(concat('dist.js'))
        .pipe(gulp.dest(jsDest+'checkin'));
})

gulp.task('uglify-vip', function() {
    return gulp.src([jsVIP, jsAssets])
        .pipe(uglify())
        .pipe(gulp.dest(jsDest+'vip'));
})
gulp.task('concat-vip', function() {
    return gulp.src([jsDest+'vip', jsMins])
        .pipe(concat('dist.js'))
        .pipe(gulp.dest(jsDest+'vip'));
})

gulp.task('minify-all', [
    'uglify-app',
    'concat-app',
    'uglify-auth',
    'concat-auth',
    'uglify-checkin',
    'concat-checkin',
    'uglify-vip',
    'concat-vip']
);

=======
gulp.task('minify', function() {
    return gulp.src(jsFiles)
        .pipe(concat('dist.concat.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('dist.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
})
>>>>>>> d4a93bdaabcb0d000f99342e0af6efaadabe7208

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
<<<<<<< HEAD
    'bower-all',
    'minify-all']
=======
    'bower-all']
    //'minify']
>>>>>>> d4a93bdaabcb0d000f99342e0af6efaadabe7208
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
