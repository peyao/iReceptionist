'use strict';

/**
 * @ngdoc function
 * @name iReceptionistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
.controller('DashboardCtrl', function($rootScope, AppointmentService) {
    $rootScope.toolbarTitle = 'Dashboard';

    console.log('DashboardCtrl loaded.');
});
