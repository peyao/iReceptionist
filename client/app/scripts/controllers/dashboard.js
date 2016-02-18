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
	
	$rootScope.todos = [
      {
        number: '(123) 456-7890',
        visitor: 'Giacomo Guilizzoni',
        employee: 'Amanda',
        notes: "Just a check up"
      },
      {
        number: '(123) 456-7890',
        visitor: 'Marco Botton',
        employee: 'Peter',
        notes: ""
      },
      {
        number: '(123) 456-7890',
        visitor: 'Mariah Maclachlan',
        employee: 'Venkman',
        notes: ""
      },
      {
        number: '(123) 456-7890',
        visitor: 'Valerie Liberty',
        employee: 'Powell',
        notes: ""
      },
    ];
	
    console.log('DashboardCtrl loaded.');
});
