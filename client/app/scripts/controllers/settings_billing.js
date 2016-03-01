/**
 * @ngdoc function
 * @name iReceptionistApp.controller:SettingsCtrl
 * @description
 * # SettingsBillingCtrl
 * Controller for the settings page
 */
angular.module('iReceptionistApp')
    .controller('SettingsBillingCtrl', function($rootScope, $scope, AppointmentService) {
        $rootScope.currentState = 'settings-billing';

        console.log('SettingsBillingCtrl loaded.');

        $('#page-content-ui-view').resize(function() {
            $('#page-content-ui-view').width($rootScope.pageContentWidth());
            $('#page-content').height($rootScope.pageContentHeight());
        });
    });
