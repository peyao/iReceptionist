/**
 * @ngdoc function
 * @name iReceptionistApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller for the registration page
 */
angular.module('iReceptionistApp')
.controller('RegisterCtrl', function($rootScope, $scope, AuthenticationService, DropZone) {

    var REGISTRATION_STEPS = 4;
    $scope.step = 1;
    $scope.register = {};
    $scope.disableNextButton = false;

    $('.select-select2').select2();

    $scope.backStep = function () {
        $scope.step--;
        registerWizard.formwizard('show', 'register-step' + $scope.step);
    };
    $scope.nextStep = function () {
        if ($scope.step === REGISTRATION_STEPS) {
            submitRegistration();
        } else {
            $scope.step++;
            registerWizard.formwizard('show', 'register-step' + $scope.step);
        }
    };
    var submitRegistration = function() {
        // TODO
    };

    $scope.logoUpload = DropZone.createNew('#logoUpload');
    $scope.bgUpload = DropZone.createNew('#bgUpload');

    /**
    *  Jquery Wizard
    */
    /* Set default wizard options */
    var wizardOptions = {
        focusFirstInput: true,
        disableUIStyles: true,
        inDuration: 0,
        outDuration: 0
    };

    /* Initialize Register Wizard */
    var registerWizard = $('#register-wizard');

    registerWizard.formwizard(wizardOptions);

    $('.clickable-steps a').on('click', function(){
        var gotostep = $(this).data('gotostep');

        registerWizard.formwizard('show', gotostep);
    });

    // Docs: http://jqueryvalidation.org/documentation/
    $('#register-wizard').formwizard({
        disableUIStyles: true,
        validationEnabled: true,
        validationOptions: {
            errorClass: 'help-block animation-slideDown', // You can change the animation class for a different entrance animation - check animations page
            errorElement: 'span',
            errorPlacement: function(error, e) {
                e.parents('.form-group > div').append(error);
            },
            highlight: function(e) {
                $(e).closest('.form-group').removeClass('has-success has-error').addClass('has-error');
                $(e).closest('.help-block').remove();
            },
            success: function(e) {
                // You can use the following if you would like to highlight with green color the input after successful validation!
                e.closest('.form-group').removeClass('has-success has-error'); // e.closest('.form-group').removeClass('has-success has-error').addClass('has-success');
                e.closest('.help-block').remove();
            },
            rules: {
                'register-step1-email': {
                    required: true,
                    email: true
                },
                'register-step1-fullname': {
                    required: true,
                    minlength: 3
                },
                'register-step1-terms': {
                    required: true
                },
                'register-step1-password': {
                    required: true,
                    minlength: 5
                },
                'register-step1-confirm-password': {
                    required: true,
                    equalTo: '#register-step1-password'
                },
                'register-step2-business-name': {
                    required: false,
                    minlength: 2
                },
                'register-step2-business-phone': {
                    required: false,
                    minlength: 7
                },
            },
            messages: {
                'register-step1-email': 'Please enter a valid email address',
                'register-step1-terms': 'Please accept the terms to continue',
                'register-step2-business-phone': 'Please enter a valid phone number'
            }
        },
        inDuration: 0,
        outDuration: 0
    });



    $scope.termsHandler = function(isChecked) {
        if (isChecked) {
            $scope.disableNextButton = false;
        } else {
            $scope.disableNextButton = true;
        }
    };
});
