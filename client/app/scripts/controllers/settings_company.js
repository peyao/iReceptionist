/**
 * @ngdoc function
 * @name iReceptionistApp.controller:SettingsCtrl
 * @description
 * # SettingsCompanyCtrl
 * Controller for the settings page
 */
angular.module('iReceptionistApp')
    .controller('SettingsCompanyCtrl', function($rootScope, $scope, $cookies, BusinessService, DropZone) {
        $rootScope.currentState = 'settings-company';

        $('#page-content-ui-view').resize(function() {
            $('#page-content-ui-view').width($rootScope.pageContentWidth());
            $('#page-content').height($rootScope.pageContentHeight());
        });

        toastr.options = {
            "positionClass": "toast-top-right",
            "timeOut": "2500"
        };

        $scope.business = $cookies.getObject('business').business;

        // Object that holds the fields to update in the business. Must also include businessId.
        var businessFields = {
            "businessId": $scope.user.business
        };

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

        $scope.logoUpload = DropZone.createNew('#logoUpload');
        $scope.bgUpload = DropZone.createNew('#bgUpload');
    });
