/**
 * @ngdoc function
 * @name iReceptionistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
.controller('IndexCtrl', function($scope, $rootScope, $timeout, $state, $window, $cookies, BusinessService) {
    $scope.doLogout = function() {
        $cookies.remove('user');
        $cookies.remove('token');
        $window.location.href = '/auth';
    };

    // If user has no token, they are not authorized.
    if (!$cookies.get('token')) {
        $scope.doLogout();
    } else {
        App.togglePageLoading(); // Stop Page Loading
    }

    $scope.user = $cookies.getObject('user');
    if (!$cookies.get('business')){
        console.log("business cookie");
        BusinessService.getBusiness(
            $scope.user.business,
            $cookies.get('token'),
            function (busObj){
                console.log("Business: " + busObj);
                console.log(busObj.business.name);
                $cookies.putObject('business', busObj);
            },
            function (err) {
                //$scope.alert.danger = err.errorMsg;
            }
        );
    }

    /**
    * Clock Functionality
    */
    $scope.clock = '';
    $scope.tickInterval = 10000; //ms
    var tick = function() {
        $scope.clock = moment().format('LT');
        $timeout(tick, $scope.tickInterval); // Reset Timer
    };
    // Start the timer
    $timeout(tick, $scope.tickInterval);


    /**
    * Search : Delegates to 'search' state
    */
    $rootScope.searchString = '';
    $scope.search = function(ss) {
        $rootScope.searchString = ss;
        if (!$rootScope.searchString.length) {
            $state.go($rootScope.currentState);
        } else if ($rootScope.currentState === 'search') {
            return;
        } else if ($rootScope.searchString.length) {
            $state.go('search');
        }
    };
});
