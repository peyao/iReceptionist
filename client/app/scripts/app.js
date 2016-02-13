'use strict';

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
    'ngRoute',
    'ngSanitize',
    'ngAria',
    'ngMaterial',
])
.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardCtrl',
            controllerAs: 'dashboard',
        })
        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl',
            controllerAs: 'about'
        })
        .otherwise({
            redirectTo: '/'
        });
})
.constant('config', {
    'apiUrl': 'http://localhost/api'
});
