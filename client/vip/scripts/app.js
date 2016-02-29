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
])
.config(function($stateProvider, $urlRouterProvider) {

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
})
.constant('config', {
    'apiUrl': 'http://localhost/api'
});
