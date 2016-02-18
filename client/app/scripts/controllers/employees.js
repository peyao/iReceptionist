'use strict';

/**
 * @ngdoc function
 * @name iReceptionistApp.controller:EmployeeCtrl
 * @description
 * # EmployeeCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
.controller('EmployeesCtrl', function($rootScope) {
    $rootScope.toolbarTitle = 'Employees';

    console.log('EmployeesCtrl loaded.');
});
