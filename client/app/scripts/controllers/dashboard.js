/**
 * @ngdoc function
 * @name iReceptionistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
    .controller('DashboardCtrl', function($rootScope, $scope, AppointmentService) {
        $rootScope.currentState = 'dashboard';

		$scope.showMine = false;
        $scope.showActive = true;
        $scope.visitors = [{
            name: 'Giacomo Guilizzoni',
            employee: 'Amanda',
            notes: 'Just a check up',
			phone: '(123) 456-7890',
			active: true
        }, {
			name: 'Marco Botton',
            employee: 'Peter',
            notes: 'Not a checkup',
			phone: '(123) 456-7890',
			active: true
        }, {
            name: 'Mariah Maclachlan',
            employee: 'Venkman',
            notes: '',
			phone: '(123) 456-7890',
			active: true
        }, {
            name: 'Valerie Liberty',
            employee: 'Powell',
            notes: '',
			phone: '(123) 456-7890',
			active: false
        }, ];

        console.log('DashboardCtrl loaded.');
    });
