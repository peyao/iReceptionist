// Karma configuration
// Generated on Fri Mar 11 2016 23:07:31 GMT-0800 (Pacific Standard Time)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'client/assets/bower_components/angular/angular.js',
            'client/assets/bower_components/angular-animate/angular-animate.js',
            'client/assets/bower_components/angular-cookies/angular-cookies.js',
            'client/assets/bower_components/angular-resource/angular-resource.js',
            'client/assets/bower_components/angular-route/angular-route.js',
            'client/assets/bower_components/angular-sanitize/angular-sanitize.js',
            'client/assets/bower_components/angular-aria/angular-aria.js',
            'client/assets/bower_components/angular-ui-router/release/angular-ui-router.js',
            'client/assets/bower_components/angular-bootstrap/ui-bootstrap.js',
            'client/assets/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'client/assets/bower_components/lodash/lodash.js',
            'client/assets/bower_components/cloudinary-core/cloudinary-core.js',
            'client/assets/bower_components/cloudinary_ng/js/angular.cloudinary.js',
            'client/assets/vendor/js/vendor/jquery-2.2.0.min.js',
            'client/assets/vendor/js/angular-form-builder.min.js',
            'client/assets/vendor/js/angular-form-builder-components.min.js',
            'client/assets/vendor/js/angular-validator.min.js',
            'client/assets/vendor/js/angular-validator-rules.min.js',
            'client/assets/bower_components/pusher/dist/*.js',
            'client/assets/bower_components/angular-mocks/angular-mocks.js',
            /*
            'client/assets/vendor/js/vendor/*.js',
            'client/assets/vendor/js/*.js',
            */

            // Load iReceptionist
            'client/app/scripts/app.js',
            'client/assets/services/*.js',
            'client/app/scripts/controllers/*.js',

            // Load Tests
            'test/controllers.js',
            //'client/app/test/spec/controllers/*.js',
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });
};
