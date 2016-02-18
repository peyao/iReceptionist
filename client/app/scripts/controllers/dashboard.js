'use strict';

/**
 * @ngdoc function
 * @name iReceptionistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
    .controller('DashboardCtrl', function($rootScope, $scope, AppointmentService) {
        $rootScope.toolbarTitle = 'Dashboard';

        $scope.showVisitorsMore = false;
        $scope.visitors = [{
            number: '(123) 456-7890',
            visitor: 'Giacomo Guilizzoni',
            employee: 'Amanda',
            notes: 'Just a check up'
        }, {
            number: '(123) 456-7890',
            visitor: 'Marco Botton',
            employee: 'Peter',
            notes: 'Not a checkup'
        }, {
            number: '(123) 456-7890',
            visitor: 'Mariah Maclachlan',
            employee: 'Venkman',
            notes: ''
        }, {
            number: '(123) 456-7890',
            visitor: 'Valerie Liberty',
            employee: 'Powell',
            notes: ''
        }, ];

        console.log('DashboardCtrl loaded.');
    });
