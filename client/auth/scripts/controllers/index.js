/**
 * @ngdoc function
 * @name iReceptionistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
.controller('IndexCtrl', function($scope, $rootScope, $state, $cookies, $window,
    $location, BusinessService) {

    var user = $cookies.getObject('user');
    var token = $cookies.get('token');

    if (token && user.rememberMe) {
        BusinessService.getBusinessSubdomain(
            user.business,
            token,
            function(subdomain) {
                var domain = $location.host();
                if (domain === 'localhost') {
                    // localhost is not a valid domain; it cannot handle subdomains,
                    // so we leave out subdomains when working locally.
                    subdomain = '';
                } else {
                    subdomain += '.';
                }
                var path = '/app';
                if (user.role < 0) {
                    path = '/vip';
                    subdomain = '';
                }
                $window.location.href = 'http://' + subdomain + domain + ':' + $location.port() + path;
            },
            function(err) {
                $window.location.href = '/app';
            }
        );
    }
});
