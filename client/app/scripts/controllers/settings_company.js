/**
 * @ngdoc function
 * @name iReceptionistApp.controller:SettingsCtrl
 * @description
 * # SettingsCompanyCtrl
 * Controller for the settings page
 */
angular.module('iReceptionistApp')
    .controller('SettingsCompanyCtrl', function ($rootScope, $scope, $cookies, BusinessService, DropZone) {
        $('#page-content-ui-view').resize(function () {
            $('#page-content-ui-view').width($rootScope.pageContentWidth());
            $('#page-content').height($rootScope.pageContentHeight());
        });

        $rootScope.currentState = 'settings-company';
        $scope.business = $cookies.getObject('business');
        $scope.logoUpload = DropZone.createNew('#logoUpload');
        $scope.bgUpload = DropZone.createNew('#bgUpload');
        $scope.logoId = $scope.business.iconURL;
        $scope.bgId = $scope.business.backgroundImageUrl;

        $trace("comp logo: " + $scope.business.iconURL);
        $trace("comp bg: " + $scope.business.backgroundImageUrl);

        var lastUploadedLogo = $scope.logoId;
        var lastUploadedBg = $scope.bgId;

        $scope.logoUpload.on("success", function (file, response) {
            $trace(file);
            $trace('Success! Cloudinary public ID is', response.public_id);
            lastUploadedLogo = response.public_id;
        });

        $scope.bgUpload.on("success", function (file, response) {
            $trace(file);
            $trace('Success! Cloudinary public ID is', response.public_id);
            lastUploadedBg = response.public_id;
        });

        toastr.options = {
            "positionClass": "toast-top-right",
            "timeOut": "2500"
        };


        // Object that holds the fields to update in the business. Must also include businessId.
        var businessFields = {
            "businessId": $scope.business._id
        };

        $scope.businessFieldChanged = function (field) {
            businessFields[field] = $scope.business[field];
        };

        var checkFieldsBusiness = function () {
            // Make sure we only send fields that have changed
            for (var key in businessFields) {
                if (businessFields[key] === $cookies.getObject('business')[key]) {
                    delete businessFields[key];
                }
            }
        };

        $scope.updateBusiness = function () {
            checkFieldsBusiness();

            BusinessService.updateBusiness(
                businessFields,
                $cookies.get('token'),
                function (busObj) {
                    toastr.success("Your settings were updated!");

                    // Update the business cookie
                    $cookies.putObject('business', busObj);
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
            businessFields['iconURL'] = lastUploadedLogo;
            $trace("check icon: " + businessFields['iconURL']);
            businessFields['backgroundImageUrl'] = lastUploadedBg;
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
                    $scope.logoId = lastUploadedLogo;
                    $scope.bgId = lastUploadedBg;
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
