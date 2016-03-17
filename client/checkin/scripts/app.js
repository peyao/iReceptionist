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
        'ngRoute',
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

function $trace(message) {
    console.log("(DEBUG) " + message);
}