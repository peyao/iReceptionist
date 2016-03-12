/**
 * @ngdoc function
 * @name iReceptionistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
.controller('IndexCtrl', function($scope, $rootScope, $timeout, $cookies, $window) {

    $scope.doLogout = function() {
        $cookies.remove('user', {'path': '/'});
        $cookies.remove('token', {'path': '/'});
        $window.location.href = '/auth';
    };

    // If user has no token, they are not authorized.
    if (!$cookies.get('token')) {
        $scope.doLogout();
    } else {
        App.togglePageLoading(); // Stop Page Loading
    }

    /**
    * Clock Functionality
    */
    $scope.clock = '';
    $scope.tickInterval = 1000; //ms (1000ms = 1s)
    var tick = function() {
        $scope.clock = moment().format('LTS');
        $timeout(tick, $scope.tickInterval); // Reset Timer
    };
    // Start the timer
    $timeout(tick, $scope.tickInterval);
});
