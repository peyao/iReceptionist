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
        'builder',
        'builder.components',
        'cloudinary'
    ])
    .config(function($stateProvider, $urlRouterProvider, cloudinaryProvider) {

        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('checkin', {
                url: '/',
                templateUrl: 'views/checkin.html',
                controller: 'CheckinCtrl'
            })
        cloudinaryProvider
            .set("cloud_name", "phoenix-sol")
            .set("upload_preset", "phtsmngp");
    });