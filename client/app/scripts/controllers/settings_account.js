/**
 * @ngdoc function
 * @name iReceptionistApp.controller:SettingsCtrl
 * @description
 * # SettingsAccountCtrl
 * Controller for the settings page
 */
angular.module('iReceptionistApp')
    .controller('SettingsAccountCtrl', function($rootScope, $scope, AppointmentService) {
        $scope.currentState = 'settings-account';

        console.log('SettingsAccountCtrl loaded.');
    });
