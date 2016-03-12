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
    'angular-loading-bar',
])
.config(function($stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {

    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 500; // Only display after 500ms.

    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('vip-dashboard', {
            url: '/',
            templateUrl: 'views/vip_dashboard.html',
            controller: 'VipDashboardCtrl'
        })
        .state('vip-settings', {
            url: '/settings',
            templateUrl: 'views/vip_settings.html',
            controller: 'VipSettingsCtrl'
        });
});
