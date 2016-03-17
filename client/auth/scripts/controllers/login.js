/**
 * @ngdoc function
 * @name iReceptionistApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
.controller('LoginCtrl', function($scope, $rootScope, $timeout, $state,
    $window, $cookies, $location, AuthenticationService, BusinessService) {

    $scope.email = '';
    $scope.password = '';
    $scope.rememberMe = true;
    $scope.alert = {
        success: '',
        warning: '',
        danger: ''
    };

    $scope.doLogin = function() {
        AuthenticationService.login(
            {
                'email': $scope.email,
                'password': $scope.password,
            },
            // Success
            function(userObj) {
                BusinessService.getBusinessSubdomain(
                    userObj.user.business,
                    userObj.token,
                    function(subdomain) {
                        var domain = $location.host();
                        if (domain === 'localhost') {
                            // localhost is not a valid domain; it cannot handle subdomains,
                            // so we leave out subdomains when working locally.
                            subdomain = '';
                        } else {
                            subdomain += '.';
                        }
                        var cookieDefaults = {
                            'path': '/',
                            'domain': domain
                        };

                        var path = '/app';
                        if (userObj.user.role < 0) {
                            path = '/vip';
                            subdomain = '';
                        }

                        userObj.user.rememberMe = $scope.rememberMe;
                        $cookies.putObject('user', userObj.user, cookieDefaults);
                        $cookies.put('token', userObj.token, cookieDefaults);

                        $window.location.href = 'http://' + subdomain + domain + ':' + $location.port() + path;
                    },
                    function(err) {
                        $scope.alert.danger = err.errorMsg;
                    }
                );
            },
            // Failure
            function(err) {
                $scope.alert.danger = err.Error;
            }
        );
    };

});
