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
                        var cookieDefaults = {
                            'path': '/',
                        };
                        var path = '/app';
                        if (userObj.user.role < 0) {
                            path = '/vip';
                        }
                        userObj.user.rememberMe = $scope.rememberMe;
                        $cookies.putObject('user', userObj.user, cookieDefaults);
                        $cookies.put('token', userObj.token, cookieDefaults);

                        var domain = $location.host().replace(/[a-zA-Z0-9]*\./,""); // Removes any subdomain.
                        $window.location.href = 'http://' + subdomain + '.' + domain + ':' + $location.port() + path;
                    },
                    function(err) {
                        $scope.alert.danger = err.errorMsg;
                    }
                );
            },
            // Failure
            function(err) {
                $scope.alert.danger = err.errorMsg;
            }
        );
    };

});
