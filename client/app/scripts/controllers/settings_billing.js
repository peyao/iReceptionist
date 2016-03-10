/**
 * @ngdoc function
 * @name iReceptionistApp.controller:SettingsCtrl
 * @description
 * # SettingsBillingCtrl
 * Controller for the settings page
 */
angular.module('iReceptionistApp')
    .controller('SettingsBillingCtrl', function($rootScope, $scope, $cookies, BusinessService) {
        $rootScope.currentState = 'settings-billing';

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
        $scope.currentPlan = $scope.business.planLevel;
        $scope.planClicked = "";
        $scope.planInfo = "";

        $scope.updatePlan = function() {
            // Credit card validation

            BusinessService.updateBusiness(
                $cookies.get('token'),
                {
                    "businessId": $scope.user.business,
                    "planLevel": $scope.planClicked
                },
                function (busObj){
                    toastr.success("Your plan was updated!");
                    $scope.currentPlan = $scope.planClicked;

                    $scope.business = busObj;
                    var businessCookie = $cookies.getObject('business');
                    businessCookie.business = busObj;
                    $cookies.putObject('business', businessCookie);
                },
                function (err) {
                    console.log("Error updating business plan level");
                }
            );
        }
    });