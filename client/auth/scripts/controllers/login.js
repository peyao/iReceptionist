/**
 * @ngdoc function
 * @name iReceptionistApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
.controller('LoginCtrl', function($scope, $rootScope, $timeout, $state,
    $window, $cookies, AuthenticationService) {

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
                // Need to set path because we are going from '/auth' to '/app' or '/vip'
                // TODO: On VIP side, need to use token to reverify the user has the correct role
                // or else log them off because they don't belong there.
                // TODO: For now, just do local role level check here and redirect.

                var path = '/app';
                if (userObj.user.role < 0) {
                    path = '/vip';
                }
                userObj.user.rememberMe = $scope.rememberMe;
                $cookies.putObject('user', userObj.user, {'path': '/'});
                $cookies.put('token', userObj.token, {'path': '/'});
                $window.location.href = path; // Redirect
            },
            // Failure
            function(err) {
                $scope.alert.danger = err.errorMsg;
            }
        );
    };

});
