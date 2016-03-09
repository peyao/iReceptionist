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

        // Object that holds the fields to update in the business. Must also include businessId.
        $scope.businessFields = {
            "businessId": $scope.user.business
        };

        $scope.updateUser = function() {
            // User service call

            // Update the user cookie
            $cookies.putObject('user', $scope.user);

            // Show alert
            toastr.success("Your settings have been updated!");
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
            // Add the changed field to the object that will be sent to backend
            $scope.businessFields[field] = $scope.business[field];
        };

        $scope.updateBusiness = function() {
            BusinessService.updateBusiness(
                $cookies.get('token'),
                $scope.businessFields,
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
        };

        //UserService.updateUser(
        //    $cookies.get('token'),
        //    {
        //        'phone': '0192837465'
        //    },
        //    function (userObj) {
        //        console.log("user update success");
        //        console.log(userObj);
        //    },
        //    function (err) {
        //        console.log("user update fail");
        //    }
        //);

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
