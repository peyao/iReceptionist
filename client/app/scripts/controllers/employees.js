'use strict';

/**
 * @ngdoc function
 * @name iReceptionistApp.controller:EmployeeCtrl
 * @description
 * # EmployeeCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
    .controller('EmployeesCtrl', function($rootScope, $scope) {
        $rootScope.toolbarTitle = 'Employees';

        $scope.showEmployeesMore = false;
        $scope.employees = [{
            number: '(123) 456-7890',
            name: 'Amanda',
        }, {
            number: '(123) 456-7890',
            name: 'Marco Botton',
        }, {
            number: '(123) 456-7890',
            name: 'Venkman',
        }, {
            number: '(123) 456-7890',
            name: 'Powell',
        }, ];

        console.log('EmployeesCtrl loaded.');
    });
