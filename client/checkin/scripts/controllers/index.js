/**
 * @ngdoc function
 * @name iReceptionistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
.controller('IndexCtrl', function($scope, $rootScope, $timeout, $state, $cookies, BusinessService) {
    $scope.user = $cookies.getObject('user');

    BusinessService.getBusiness(
        $scope.user.business,
        $cookies.get('token'),
        function (busObj){
            $trace("Business: " + busObj);
            $trace(busObj.name);
            $cookies.putObject('business', busObj);
        },
        function (err) {
            //$scope.alert.danger = err.errorMsg;
        }
    );
});