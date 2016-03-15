/**
 * @ngdoc function
 * @name iReceptionistApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
.controller('SearchCtrl', function($scope, $rootScope, $timeout, $state, $cookies, SearchService) {

    $scope.user = $cookies.getObject('user');
    var token = $cookies.get('token');

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

    // Runs whenever $rootScope.searchString changes.
    $scope.$watch('searchString', function() {
        $scope.searchEmployeesHeader = 'searching...';
        $scope.searchVisitorsHeader = 'searching...';
        SearchService.searchEmployees(
            $rootScope.searchString,
            token,
            function(searchResults) {
                $scope.employees = searchResults;
                $scope.searchEmployeesHeader = '';
            },
            function(err) {
                $trace(err.errorMsg);
            }
        );
        SearchService.searchVisitors(
            $rootScope.searchString,
            token,
            function(searchResults) {
                $scope.visitors = searchResults;
                $scope.searchVisitorsHeader = '';
            },
            function(err) {
                $trace(err.errorMsg);
            }
        );
    });
});
