/**
 * @ngdoc function
 * @name iReceptionistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
.controller('IndexCtrl', function($scope, $rootScope, $timeout, $cookies,
    $location, $window) {

    $scope.doLogout = function() {
        console.log($cookies);
        $cookies.remove('business', {'path': '/'});
        var domain = $location.host();
        var urlParts = domain.split('.');
        var tld = '';
        if (urlParts[0] === 'localhost') {
            domain = urlParts[0];
        } else {
            domain = urlParts[0];
            tld = '.' + urlParts[1];
        }
        console.log($cookies);
        $window.location.href = 'http://' + domain + tld + ':' + $location.port() + '/auth/#/logout';
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
