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
        $('#page-content-ui-view').resize(function() {
            $('#page-content-ui-view').width($rootScope.pageContentWidth());
            $('#page-content').height($rootScope.pageContentHeight());
        });

        toastr.options = {
            "positionClass": "toast-top-right",
            "timeOut": "2500"
        };

        $scope.user = $cookies.getObject('user');
        $scope.business = $cookies.getObject('business').business;

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
                $cookies.get('token'),
                userFields,
                function (userObj) {
                    toastr.success("Your settings have been updated!");

                    // Update the user cookie
                    $cookies.putObject('user', userObj);
                    console.log(userObj);
                },
                function (err) {
                    console.log("Error updating user settings");
                }
            );

            // Reset the changed fields
            userFields = {};
        };

        $scope.updateEmailNotifications = function() {
            // User service call
        };

        $scope.updateSMSNotifications = function() {
            // User service call
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
                $cookies.get('token'),
                businessFields,
                function (busObj){
                    toastr.success("Your settings were updated!");

                    // Update the business cookie
                    var businessCookie = $cookies.getObject('business');
                    businessCookie.business = busObj;
                    $cookies.putObject('business', businessCookie);
                },
                function (err) {
                    console.log("Error updating business settings");
                }
            );

            // Reset the changed fields
            businessFields = {
                "businessId": $scope.user.business
            };
        };

        //UserService.changePassword(
        //    $cookies.get('token'),
        //    {
        //        'oldPassword': 'oldValue',
        //        'newPassword': 'newValue'
        //    },
        //    function (userObj) {
        //        console.log("change password success: " + userObj);
        //    },
        //    function (err) {
        //        console.log("change password fail");
        //    }
        //);

        $scope.avatarUpload = DropZone.createNew('#avatarUpload');
        $scope.logoUpload = DropZone.createNew('#logoUpload');
        $scope.bgUpload = DropZone.createNew('#bgUpload');
    });
