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
    'ngSanitize',
    'ngAria',
    'ngMaterial',
    'ui.router',
])
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('dashboard', {
            url: '/',
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardCtrl'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl'
        })
        .state('settings', {
            url: '/settings',
            templateUrl: 'views/settings.html',
            controller: 'SettingsCtrl'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/register.html',
            controller: 'RegisterCtrl'
        })
        .state('createcompany', {
            url: '/createcompany',
            templateUrl: 'views/createcompany.html',
            controller: 'CreateCompanyCtrl'
        })
        .state('visitorform', {
            url: '/visitorform',
            templateUrl: 'views/visitorform.html',
            controller: 'VisitorFormCtrl'
        })
        .state('themes', {
            url: '/themes',
            templateUrl: 'views/themes.html',
            controller: 'ThemesCtrl'
        })
        .state('addemployees', {
            url: '/addemployees',
            templateUrl: 'views/addemployees.html',
            controller: 'AddEmployeesCtrl'
        });
})
.constant('config', {
    'apiUrl': 'http://localhost/api'
});
