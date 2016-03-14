/**
 * @ngdoc function
 * @name iReceptionistApp.controller:SettingsCtrl
 * @description
 * # SettingsCompanyCtrl
 * Controller for the settings page
 */
angular.module('iReceptionistApp')
    .controller('SettingsCompanyCtrl', function ($rootScope, $scope, $cookies, BusinessService, DropZone) {
        $rootScope.currentState = 'settings-company';
        $scope.business = $cookies.getObject('business').business;

        $scope.logoUpload = DropZone.createNew('#logoUpload');
        $scope.bgUpload = DropZone.createNew('#bgUpload');

        $scope.logoId = $scope.business.iconURL;
        $scope.bgId = $scope.business.backgroundImageUrl;

        var localLogoId = $scope.business.iconURL;
        var localBgId = $scope.business.backgroundImageUrl;

        $('#page-content-ui-view').resize(function () {
            $('#page-content-ui-view').width($rootScope.pageContentWidth());
            $('#page-content').height($rootScope.pageContentHeight());
        });

        toastr.options = {
            "positionClass": "toast-top-right",
            "timeOut": "2500"
        };

        // Object that holds the fields to update in the business. Must also include businessId.
        var businessFields = {
            "businessId": $scope.user.business
        };

        $scope.businessFieldChanged = function (field) {
            businessFields[field] = $scope.business[field];
        };

        var checkFieldsBusiness = function () {
            // Make sure we only send fields that have changed
            for (var key in businessFields) {
                if (businessFields[key] === $cookies.getObject('business').business[key]) {
                    delete businessFields[key];
                }
            }
        };

        $scope.logoUpload.on("success", function (file) {
            localLogoId = DropZone.getId();
            $trace("logo pic: " + localLogoId);
        });

        $scope.bgUpload.on("success", function (file) {
            localBgId = DropZone.getId();
            $trace("Bg pic:" + localBgId);
        });


        $scope.updateBusiness = function () {
            checkFieldsBusiness();

            BusinessService.updateBusiness(
                businessFields,
                $cookies.get('token'),
                function (busObj) {
                    toastr.success("Your settings were updated!");

                    // Update the business cookie
                    var businessCookie = $cookies.getObject('business');
                    businessCookie.business = busObj;
                    $cookies.putObject('business', businessCookie);
                },
                function (err) {
                    toastr.error("Error updating settings.");
                    $trace(err);
                }
            );

            // Reset the changed fields
            businessFields = {
                "businessId": $scope.user.business
            };
        };

        var checkImagesBusiness = function () {
            businessFields['iconURL'] = localLogoId;
            $trace("check icon: " + businessFields['iconURL']);
            businessFields['backgroundImageUrl'] = localBgId;
            $trace("check bg: " + businessFields['backgroundImageUrl']);
        };

        $scope.updateImages = function () {
            checkImagesBusiness();

            $trace("update icon: " + businessFields['iconURL']);
            BusinessService.updateBusiness(
                businessFields,
                $cookies.get('token'),
                function (busObj) {
                    toastr.success("Your settings were updated!");

                    // Update the business cookie
                    var businessCookie = $cookies.getObject('business');
                    businessCookie.business = busObj;
                    $cookies.putObject('business', businessCookie);
                    $scope.logoId = localLogoId;
                    $scope.bgId = localBgId;
                },
                function (err) {
                    toastr.error("Error updating settings.");
                    $trace(err);
                }
            );
            // Reset the changed fields
            businessFields = {
                "businessId": $scope.user.business
            };
        };

    });
