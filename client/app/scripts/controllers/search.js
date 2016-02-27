/**
 * @ngdoc function
 * @name iReceptionistApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
.controller('SearchCtrl', function($scope, $rootScope, $timeout, $state) {

    $scope.returnState = function() {
        $state.go($rootScope.currentState || 'dashboard');
    };

    // If there's no string, but somehow linked here, redirect to last state.
    if (!$rootScope.searchString.length) {
        $scope.returnState();
    }

    $scope.activateVisitor = function(index) {
        $scope.showVisitor = true;
        $scope.activeVisitor = $scope.visitors[index];
    };
    $scope.activateEmployee = function(index) {
        $scope.showEmployee = true;
        $scope.activeEmployee = $scope.employees[index];
    };

    $scope.employees = [{
        name: 'Amanda',
        phone: '(123) 456-7890',
        email: 'amanda@gmail.com',
        role: 'employee',
    }, {
        name: 'Marco Botton',
        phone: '(123) 456-7890',
        email: 'marco@gmail.com',
        role: 'employee',
    }, {
        name: 'Venkman',
        phone: '(123) 456-7890',
        email: 'venkman@gmail.com',
        role: 'admin',
    }, {
        name: 'Powell',
        phone: '(123) 456-7890',
        email: 'powell@gmail.com',
        role: 'employee',
    }];

    $scope.visitors = [{
        phone: '(123) 456-7890',
        name: 'Giacomo Guilizzoni',
        email: 'giacomog@gmail.com',
        timesVisited: 5
    }, {
        phone: '(123) 456-7890',
        name: 'Marco Botton',
        email: 'marcob@gmail.com',
        timesVisited: 3
    }, {
        phone: '(123) 456-7890',
        name: 'Mariah Maclachlan',
        email: 'mariahm@gmail.com',
        timesVisited: 1
    }, {
        phone: '(123) 456-7890',
        name: 'Valerie Liberty',
        email: 'valeriel@gmail.com',
        timesVisited: 12
    }];
});
