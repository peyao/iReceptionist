/**
 * @ngdoc function
 * @name iReceptionistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
.controller('IndexCtrl', function($scope, $rootScope, $timeout) {
    console.log('IndexCtrl loaded.');

    $rootScope.pageContentWidth = function() {
        return $('#page-content').width();
    };
    $rootScope.pageContentHeight = function() {
        return $('#page-content-ui-view').innerHeight();
    };

    $('#page-content').resize(function() {
        $('#page-content-ui-view').width($rootScope.pageContentWidth());
        $('#page-content').height($rootScope.pageContentHeight());
    });

    $scope.clock = '';
    $scope.tickInterval = 10000; //ms (1000ms = 1s)

    var tick = function() {
        $scope.clock = moment().format('LT');
        $timeout(tick, $scope.tickInterval); // Reset Timer
    };

    // Start the timer
    $timeout(tick, $scope.tickInterval);
});
