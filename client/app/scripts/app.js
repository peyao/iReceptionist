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
    'cloudinary',
    'builder',
    'builder.components',
    'validator.rules'
])
.config(function($stateProvider, $urlRouterProvider, cloudinaryProvider) {

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
        .state('settings-forms-themes', {
            url: '/settings/forms-themes',
            templateUrl: 'views/settings/settings_forms_themes.html',
            controller: 'SettingsFormsThemesCtrl'
        })
        .state('settings-billing', {
            url: '/settings/billing',
            templateUrl: 'views/settings/settings_billing.html',
            controller: 'SettingsBillingCtrl'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/auth/register.html',
            controller: 'RegisterCtrl'
        })
        .state('search', {
            url: '/search',
            templateUrl: 'views/search.html',
            controller: 'SearchCtrl'
        });

    cloudinaryProvider
        .set("cloud_name", "phoenix-sol")
        .set("upload_preset", "phtsmngp");
});
