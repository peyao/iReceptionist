/**
 * @ngdoc function
 * @name iReceptionistApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
.controller('LogoutCtrl', function($scope, $rootScope, $timeout, $state,
    $window, $cookies, $location, AuthenticationService, BusinessService) {

    var domain = $location.host();
    $cookies.remove('user', {'path': '/', 'domain': domain});
    $cookies.remove('token', {'path': '/', 'domain': domain});
    $window.location.href = '/auth';
});
