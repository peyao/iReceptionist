/**
 * Created by samanthahahn on 2/15/16.
 */
'use strict';

/**
 * @ngdoc function
 * @name iReceptionistApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller for the settings page
 */
angular.module('iReceptionistApp')
    .controller('SettingsCtrl', function($rootScope, AppointmentService) {
        $rootScope.toolbarTitle = 'Settings';

        console.log('SettingsCtrl loaded.');
    });
