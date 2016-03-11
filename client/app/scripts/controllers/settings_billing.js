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

        $('[data-numeric]').payment('restrictNumeric');
        $('#credit-card').payment('formatCardNumber');
        $('#security-code').payment('formatCardCVC');
        $('#expiration-date').payment('formatCardExpiry');

        $scope.user = $cookies.getObject('user');
        $scope.business = $cookies.getObject('business').business;
        $scope.currentPlan = $scope.business.planLevel;
        $scope.planClicked = "";
        $scope.planInfo = "";

        // Credit card info
        $scope.name = "";
        $scope.card = "";
        $scope.securityCode = "";
        $scope.expirationDate = "";

        $('.credit-card-input').focus(function() {
           $('.credit-card-error').text("").addClass('hidden');
        });

        $scope.updatePlan = function() {
            // Credit card validation
            var nameValid = $scope.name !== "";
            var cardValid = $.payment.validateCardNumber($scope.card);
            var securityCodeValid = $.payment.validateCardCVC($scope.securityCode);
            var date = $scope.expirationDate.split("/");
            var expirationMonth = date[0].trim();
            var expirationYear = date[1].trim();
            var expirationDateValid = $.payment.validateCardExpiry(expirationMonth, expirationYear);

            if (!nameValid) {
                $('.credit-card-error').text("Please enter the name on your card.").removeClass('hidden');
                return;
            }
            if (!cardValid) {
                $('.credit-card-error').text("Invalid credit card.").removeClass('hidden');
                return;
            }
            if (!securityCodeValid) {
                $('.credit-card-error').text("Invalid security code.").removeClass('hidden');
                return;
            }
            if (!expirationDateValid) {
                $('.credit-card-error').text("Invalid expiration date.").removeClass('hidden');
                return;
            }

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

            // Close the modal
            $('#plan-modal').modal('hide');
        }
    });