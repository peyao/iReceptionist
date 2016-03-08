/**
 * @ngdoc function
 * @name iReceptionistApp.controller:SettingsCtrl
 * @description
 * # SettingsAccountCtrl
 * Controller for the settings page
 */
angular.module('iReceptionistApp')
    .controller('SettingsAccountCtrl', function($rootScope, $scope, DropZone, $cookies) {
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

        if ($scope.user.settings.receiveEmail === null) {
            $scope.user.settings.receiveEmail = true;
        }
        if ($scope.user.settings.receiveSMS === null) {
            $scope.user.settings.receiveSMS = true;
        }

        $scope.updateUser = function() {
            // User service call

            // Update the user cookie
            $cookies.putObject('user', $scope.user);

            // Show alert
            toastr.success("Your settings have been updated!");
        };

        $scope.avatarUpload = DropZone.createNew('#avatarUpload');
        $scope.logoUpload = DropZone.createNew('#logoUpload');
        $scope.bgUpload = DropZone.createNew('#bgUpload');
    });
