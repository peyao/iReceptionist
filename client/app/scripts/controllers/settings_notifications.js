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

        $('#page-content-ui-view').resize(function() {
            $('#page-content-ui-view').width($rootScope.pageContentWidth());
            $('#page-content').height($rootScope.pageContentHeight());
        });

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
                    console.log(userObj);
                },
                function (err) {
                    toastr.error("Error updating notification settings.");
                    console.log(err);
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
                    console.log(userObj);
                },
                function (err) {
                    toastr.error("Error updating notification settings.");
                    console.log(err);
                }
            );
        };

        // Need browser notifications field in user settings
        /*$scope.updateBrowserNotifications = function() {
         // User service call
         };*/
    });
