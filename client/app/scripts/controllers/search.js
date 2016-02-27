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
    }];

    $scope.visitors = [{
        phone: '(123) 456-7890',
        name: 'Giacomo Guilizzoni',
        employee: 'Amanda',
        notes: 'Just a check up'
    }, {
        phone: '(123) 456-7890',
        name: 'Marco Botton',
        employee: 'Peter',
        notes: 'Not a checkup'
    }, {
        phone: '(123) 456-7890',
        name: 'Mariah Maclachlan',
        employee: 'Venkman',
        notes: ''
    }, {
        phone: '(123) 456-7890',
        name: 'Valerie Liberty',
        employee: 'Powell',
        notes: ''
    }];
});
