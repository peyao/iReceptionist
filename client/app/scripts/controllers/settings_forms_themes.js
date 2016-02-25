/**
 * @ngdoc function
 * @name iReceptionistApp.controller:SettingsCtrl
 * @description
 * # SettingsFormsThemesCtrl
 * Controller for the settings page
 */
angular.module('iReceptionistApp')
    .controller('SettingsFormsThemesCtrl', function($rootScope, $scope, AppointmentService) {
        $scope.currentState = 'settings-forms-themes';

        console.log('SettingsFormsThemesCtrl loaded.');
    });
