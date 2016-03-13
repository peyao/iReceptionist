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
        .state('vip-employees', {
            url: '/employees',
            templateUrl: 'views/vip_employees.html',
            controller: 'VipEmployeesCtrl'
        });
});
