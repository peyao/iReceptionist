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
    'ui.router',
    'ui.bootstrap',
    'anim-in-out',
])
.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('dashboard', {
            url: '/',
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardCtrl'
        })
        .state('employees', {
            url: '/employees',
            templateUrl: 'views/employees.html',
            controller: 'EmployeesCtrl'
        })
        .state('settings-account', {
            url: '/settings/account',
            templateUrl: 'views/settings/settings_account.html',
            controller: 'SettingsAccountCtrl'
        })
        /*
        .state('settings-forms-themes', {
            url: '/settings/forms-themes',
            templateUrl: 'views/settings_forms_themes.html',
            controller: 'SettingsFormsThemesCtrl'
        })
        .state('settings-billing', {
            url: '/settings/billing',
            templateUrl: 'views/settings_billing.html',
            controller: 'SettingsBillingCtrl'
        })
        */
        .state('register', {
            url: '/register',
            templateUrl: 'views/auth/register.html',
            controller: 'RegisterCtrl'
        })
        .state('vip-dashboard', {
            url: '/vip',
            templateUrl: 'views/vip/vip_dashboard.html',
            controller: 'VipDashboardCtrl'
        })
        .state('vip-settings', {
            url: '/vip/settings',
            templateUrl: 'views/vip/vip_settings.html',
            controller: 'VipSettingsCtrl'
        });
})
.constant('config', {
    'apiUrl': 'http://localhost/api'
});
