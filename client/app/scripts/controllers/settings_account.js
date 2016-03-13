/**
 * @ngdoc function
 * @name iReceptionistApp.controller:SettingsCtrl
 * @description
 * # SettingsAccountCtrl
 * Controller for the settings page
 */
angular.module('iReceptionistApp')
    .controller('SettingsAccountCtrl', function($rootScope, $scope, $cookies, DropZone, UserService) {
        $rootScope.currentState = 'settings-account';

        toastr.options = {
            "positionClass": "toast-top-right",
            "timeOut": "2500"
        };

        $scope.user = $cookies.getObject('user');
        $scope.oldPassword = '';
        $scope.password = '';
        $scope.confirmPassword = '';

        // Object that holds the fields to update in the user.
        var userFields = {};

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

        // Update the site color theme. The theme will be stored in the db as a string in the
        // format color.header.sidebar
        $scope.updateTheme = function(theme) {
            UserService.updateUser(
                {
                    "theme": theme
                },
                $cookies.get('token'),
                function (userObj) {
                    toastr.info("Please reload the page for your theme to take effect.");
                    toastr.success("Your theme has been updated!");

                    // Update the user cookie
                    $cookies.putObject('user', userObj);
                },
                function (err) {
                    toastr.error("Error updating theme.");
                    console.log(err);
                }
            );
        };

        $scope.avatarUpload = DropZone.createNew('#avatarUpload');
        $scope.logoUpload = DropZone.createNew('#logoUpload');
        $scope.bgUpload = DropZone.createNew('#bgUpload');
    });
