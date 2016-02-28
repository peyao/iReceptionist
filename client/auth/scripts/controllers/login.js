/**
 * @ngdoc function
 * @name iReceptionistApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
.controller('LoginCtrl', function($scope, $rootScope, $timeout, $state, $window) {

    $scope.doLogin = function() {
        $window.location.href = '/app/#/';
    };
});
