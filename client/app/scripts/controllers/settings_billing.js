/**
 * @ngdoc function
 * @name iReceptionistApp.controller:SettingsCtrl
 * @description
 * # SettingsBillingCtrl
 * Controller for the settings page
 */
angular.module('iReceptionistApp')
    .controller('SettingsBillingCtrl', function($rootScope, $scope) {
        $rootScope.currentState = 'settings-billing';

        $('#page-content-ui-view').resize(function() {
            $('#page-content-ui-view').width($rootScope.pageContentWidth());
            $('#page-content').height($rootScope.pageContentHeight());
        });

        $scope.currentPlan = "Free";
        $scope.planClicked = "";
        $scope.planInfo = "";

        $scope.updatePlan = function() {
            // Credit card validation
            $scope.currentPlan = $scope.planClicked;
        }
    });