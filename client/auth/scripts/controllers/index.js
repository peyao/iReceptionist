/**
 * @ngdoc function
 * @name iReceptionistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
.controller('IndexCtrl', function($scope, $rootScope, $state, $cookies, $window) {
    var user = $cookies.getObject('user');
    var token = $cookies.get('token');

    if (token && user.rememberMe) {
        var path = '/app';
        if (user.role < 0) {
            path = '/vip';
        }
        $window.location.href = path; // Redirect
    }
});
