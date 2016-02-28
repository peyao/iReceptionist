/**
 * @ngdoc overview
 * @name iReceptionistApp
 * @description
 * # iReceptionistApp
 *
 * Main module of the application.
 */
angular
.module('iReceptionistApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngAria',
    'ui.router',
    'ui.bootstrap',
    'anim-in-out',
    'ngRoute',
    'cloudinary'
])
.config(function($stateProvider, $urlRouterProvider, cloudinaryProvider) {

    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('login', {
            url: '/',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .state('reset-password', {
            url: '/reset',
            templateUrl: 'views/reset-password.html',
            controller: 'ResetPasswordCtrl'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/register.html',
            controller: 'RegisterCtrl'
        });

    cloudinaryProvider
        .set("cloud_name", "phoenix-sol")
        .set("upload_preset", "phtsmngp");
})
.constant('config', {
    'apiUrl': 'http://localhost/api'
});
