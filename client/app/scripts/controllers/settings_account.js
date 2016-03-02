/**
 * @ngdoc function
 * @name iReceptionistApp.controller:SettingsCtrl
 * @description
 * # SettingsAccountCtrl
 * Controller for the settings page
 */
angular.module('iReceptionistApp')
    .controller('SettingsAccountCtrl', function($rootScope, $scope, DropZone) {
        $rootScope.currentState = 'settings-account';
        $('#page-content-ui-view').resize(function() {
            $('#page-content-ui-view').width($rootScope.pageContentWidth());
            $('#page-content').height($rootScope.pageContentHeight());
        });

        $scope.avatarUpload = DropZone.createNew('#avatarUpload');
        $scope.logoUpload = DropZone.createNew('#logoUpload');
        $scope.bgUpload = DropZone.createNew('#bgUpload');
    });
