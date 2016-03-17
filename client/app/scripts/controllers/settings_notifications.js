/**
 * @ngdoc function
 * @name iReceptionistApp.controller:SettingsCtrl
 * @description
 * # SettingsNotificationsCtrl
 * Controller for the settings page
 */
angular.module('iReceptionistApp')
    .controller('SettingsNotificationsCtrl', function($scope, $builder, $validator, $rootScope, $cookies, UserService) {
        $rootScope.currentState = 'settings-notifications';

        $scope.user = $cookies.getObject('user');

        $scope.updateEmailNotifications = function() {
            var receiveEmail = $scope.user.settings.receiveEmail === true ? "true" : "false";

            UserService.updateUser(
                {
                    "receiveEmail": receiveEmail
                },
                $cookies.get('token'),
                function (userObj) {
                    toastr.success("Your settings have been updated!");

                    // Update the user cookie
                    $cookies.putObject('user', userObj);
                    $trace(userObj);
                },
                function (err) {
                    toastr.error("Error updating notification settings.");
                    $trace(err);
                }
            );
        };

        $scope.updateSMSNotifications = function() {
            var receiveSMS = $scope.user.settings.receiveSMS === true ? "true" : "false";

            UserService.updateUser(
                {
                    "receiveSMS": receiveSMS
                },
                $cookies.get('token'),
                function (userObj) {
                    toastr.success("Your settings have been updated!");

                    // Update the user cookie
                    $cookies.putObject('user', userObj);
                    $trace(userObj);
                },
                function (err) {
                    toastr.error("Error updating notification settings.");
                    $trace(err);
                }
            );
        };

        $scope.updateBrowserNotifications = function() {
            var receiveBrowser = $scope.user.settings.receiveBrowserNotification === true ? "true" : "false";

            UserService.updateUser(
                {
                    "receiveBrowserNotification": receiveBrowser
                },
                $cookies.get('token'),
                function (userObj) {
                    toastr.success("Your settings have been updated!");

                    // Update the user cookie
                    $cookies.putObject('user', userObj);
                    $trace(userObj);
                },
                function (err) {
                    toastr.error("Error updating notification settings.");
                    $trace(err);
                }
            );
        };
    });
