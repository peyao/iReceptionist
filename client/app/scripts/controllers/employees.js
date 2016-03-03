'use strict';

/**
 * @ngdoc function
 * @name iReceptionistApp.controller:EmployeeCtrl
 * @description
 * # EmployeeCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
    .controller('EmployeesCtrl', function ($rootScope, $scope) {
        $rootScope.currentState = 'employees';
        $scope.showEmployeesMore = false;
        $scope.employees = [{
            name: 'Marco Botton',
            phone: '(123) 456-7890',
            email: 'marco@gmail.com'
        }, {
            name: 'Peter Venkman',
            phone: '(123) 456-7890',
            email: 'venkman@gmail.com'
        }, {
            name: 'Powell',
            phone: '(123) 456-7890',
            email: 'powell@gmail.com'
        } ];

      /*  $scope.submit = function (form) {
        $http.post('/api/employee',
              {
                name: form.name,
                email: form.email,
                number: form.number
                })
      };*/

        console.log('EmployeesCtrl loaded.');
    });
