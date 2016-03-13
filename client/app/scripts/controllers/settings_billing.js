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

        toastr.options = {
            "positionClass": "toast-top-right",
            "timeOut": "2500"
        };

        $scope.user = $cookies.getObject('user');
        $scope.business = $cookies.getObject('business').business;
        // Get the current plan and capitalize the first letter of it
        $scope.currentPlan = $scope.business.planLevel.charAt(0).toUpperCase() + $scope.business.planLevel.slice(1);
        $scope.planClicked = "";
        $scope.planInfo = "";

        // Restrict input for credit card fields
        $('[data-numeric]').payment('restrictNumeric');
        $('#credit-card').payment('formatCardNumber');
        $('#security-code').payment('formatCardCVC');
        $('#expiration-date').payment('formatCardExpiry');

        // Put in today's date for the transactions
        var date = new Date();
        $('.transaction-date').text((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());

        // Make due date a month from today
        $scope.dueDate = (date.getMonth() + 2) + "/" + date.getDate() + "/" + date.getFullYear();

        // Show the transaction for the current plan
        var showTransaction = function(plan) {
            if (plan === 'Free') {
                $('#free-transaction').show();
                $('#basic-transaction').hide();
                $('#premium-transaction').hide();
            }
            else if (plan === 'Basic') {
                $('#free-transaction').hide();
                $('#basic-transaction').show();
                $('#premium-transaction').hide();
            }
            else if (plan === 'Premium') {
                $('#free-transaction').hide();
                $('#basic-transaction').hide();
                $('#premium-transaction').show();
            }
        };

        // Show the transaction row for the current plan
        showTransaction($scope.currentPlan);

        // Credit card info
        $scope.name = "";
        $scope.card = "";
        $scope.securityCode = "";
        $scope.expirationDate = "";

        // Hide error message when a credit card field is clicked on
        $('.credit-card-input').focus(function() {
           $('.credit-card-error').text("").addClass('hidden');
        });

        $scope.updatePlan = function() {
            // Credit card validation
            if ($scope.planClicked !== 'Free') {
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
            }

            BusinessService.updateBusiness(
                {
                    "businessId": $scope.user.business,
                    "planLevel": $scope.planClicked
                },
                $cookies.get('token'),
                function (busObj){
                    toastr.success("Your plan was updated!");
                    $scope.currentPlan = $scope.planClicked;

                    $scope.business = busObj;
                    var businessCookie = $cookies.getObject('business');
                    businessCookie.business = busObj;
                    $cookies.putObject('business', businessCookie);

                    // Show the transaction row for the clicked plan
                    showTransaction($scope.planClicked);

                    // Clear the inputs
                    $('.credit-card-input').val('');
                },
                function (err) {
                    toastr.error("Error updating plan.");
                    console.log("Error updating business plan level");
                }
            );

            // Close the modal
            $('#plan-modal').modal('hide');
        };
    });
