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
            name: 'Amanda',
            phone: '(123) 456-7890',
            email: 'amanda@gmail.com'
        }, {
            name: 'Marco Botton',
            phone: '(123) 456-7890',
            email: 'marco@gmail.com'
        }, {
            name: 'Venkman',
            phone: '(123) 456-7890',
            email: 'venkman@gmail.com'
        }, {
            name: 'Powell',
            phone: '(123) 456-7890',
            email: 'powell@gmail.com'
        }, ];

        console.log('EmployeesCtrl loaded.');
    });
