/**
 * @ngdoc function
 * @name iReceptionistApp.controller:SettingsCtrl
 * @description
 * # SettingsAccountCtrl
 * Controller for the settings page
 */
angular.module('iReceptionistApp')
    .controller('SettingsAccountCtrl', function($rootScope, $scope, $cookies, DropZone, BusinessService, UserService) {
        $rootScope.currentState = 'settings-account';

        toastr.options = {
            "positionClass": "toast-top-right",
            "timeOut": "2500"
        };

        $scope.user = $cookies.getObject('user');
        $scope.business = $cookies.getObject('business').business;
        $scope.oldPassword = '';
        $scope.password = '';
        $scope.confirmPassword = '';

        // Object that holds the fields to update in the user.
        var userFields = {};

        // Object that holds the fields to update in the business. Must also include businessId.
        var businessFields = {
            "businessId": $scope.user.business
        };

        $scope.userFieldChanged = function(field) {
            userFields[field] = $scope.user[field];
        };

        var checkFieldsUser = function() {
            // Make sure we only send fields that have changed
            for (var key in userFields) {
                if (userFields[key] === $cookies.getObject('user')[key]) {
                    delete userFields[key];
                }
            }
        };

        $scope.updateUser = function() {
            checkFieldsUser();

            UserService.updateUser(
                userFields,
                $cookies.get('token'),
                function (userObj) {
                    toastr.success("Your settings have been updated!");

                    // Update the user cookie
                    $cookies.putObject('user', userObj);
                },
                function (err) {
                    toastr.error("Error updating settings.");
                    console.log(err);
                }
            );

            // Reset the changed fields
            userFields = {};
        };

        $('.password-field').focus(function() {
            // Hide error message when a password field is clicked on
            $('#password-error').text('').addClass('hidden');
        });

        $scope.updatePassword = function() {
            // Validation
            if ($scope.oldPassword === '' || $scope.password === '' || $scope.confirmPassword === '') {
                $('#password-error').text("All fields are required.").removeClass('hidden');
                return;
            }

            if ($scope.password !== $scope.confirmPassword) {
                $('#password-error').text("New password and confirm password do not match.").removeClass('hidden');
                return;
            }

            UserService.changePassword(
                {
                    "oldPassword": $scope.oldPassword,
                    "newPassword": $scope.password
                },
                $cookies.get('token'),
                function (userObj) {
                    toastr.success("Your settings have been updated!");

                    // Update the user cookie
                    $cookies.putObject('user', userObj);
                },
                function (err) {
                    toastr.error("Error updating password.");
                    console.log(err);
                }
            );

            // Reset the changed fields
            $scope.oldPassword = '';
            $scope.password = '';
            $scope.confirmPassword = '';
        };

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

        $scope.businessFieldChanged = function(field) {
            businessFields[field] = $scope.business[field];
        };

        var checkFieldsBusiness = function() {
            // Make sure we only send fields that have changed
            for (var key in businessFields) {
                if (businessFields[key] === $cookies.getObject('business').business[key]) {
                    delete businessFields[key];
                }
            }
        };

        $scope.updateBusiness = function() {
            checkFieldsBusiness();

            BusinessService.updateBusiness(
                businessFields,
                $cookies.get('token'),
                function (busObj){
                    toastr.success("Your settings were updated!");

                    // Update the business cookie
                    var businessCookie = $cookies.getObject('business');
                    businessCookie.business = busObj;
                    $cookies.putObject('business', businessCookie);
                },
                function (err) {
                    toastr.error("Error updating settings.");
                    console.log(err);
                }
            );

            // Reset the changed fields
            businessFields = {
                "businessId": $scope.user.business
            };
        };

        $scope.avatarUpload = DropZone.createNew('#avatarUpload');
        $scope.logoUpload = DropZone.createNew('#logoUpload');
        $scope.bgUpload = DropZone.createNew('#bgUpload');
    });
