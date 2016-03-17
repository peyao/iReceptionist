/**
 * @ngdoc function
 * @name iReceptionistApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller for the registration page
 */
angular.module('iReceptionistApp')
    .controller('RegisterCtrl', function ($rootScope, $scope, $http, $window,
        $cookies, $location, AuthenticationService, BusinessService, DropZone) {

        var REGISTRATION_STEPS = 4;
        var ONE = 1;
        var TWO = 2;
        var THREE = 3;
        var FOUR = 4;


        $scope.max = REGISTRATION_STEPS;
        $scope.step = 1;
        $scope.register = {};
        $scope.disableNextButton = true;
        $scope.inputType = 'password';


        $scope.register = {};
        $scope.register.step1 = {};
        $scope.register.step2 = {};
        $scope.register.step4 = {};

        $scope.register.step1.fullName = '';
        $scope.register.step1.email = '';
        $scope.register.step1.phone = '';
        $scope.register.step1.password = '';

        $scope.register.step2.businessName = '';
        $scope.register.step2.phone = '';
        $scope.register.step2.type = '';

        $scope.register.step4.name = '';
        $scope.register.step4.email = '';
        $scope.register.step4.phone = '';


        $('.select-select2').select2({
            minimumResultsForSearch: Infinity
        });

        $scope.disableNext = function () {

            // if on step1 and you don't have valid fields then the next button is disabled
            if ($scope.step === ONE) {
                if ($scope.register.step1.email && $scope.register.step1.fullName && $scope.register.step1.phone && $scope.register.step1.password) {
                    if (!($scope.disableNextButton)) {
                        return false;
                    }

                }
                return true;
            }
            if ($scope.step === TWO) {

                // if on step 2 and fields not filled out disable button
                if ($scope.register.step2.businessName && $scope.register.step2.phone && $scope.register.step2.type) {
                    return false;
                }
                return true;
            }

            if ($scope.step === FOUR) {
                // if on step 4 and fill out name, then finish rest before moving on
                if ($scope.register.step4.name || $scope.register.step4.email || $scope.register.step4.phone) {
                    if ($scope.register.step4.name && $scope.register.step4.email && $scope.register.step4.phone) {
                        return false;
                    }
                    return true;
                }
                else {
                    return false;
                }
            }
            return false;
        };

        $scope.backStep = function () {
            $scope.step--;
            registerWizard.formwizard('show', 'register-step' + $scope.step);
        };
        $scope.nextStep = function () {
            if ($scope.step === REGISTRATION_STEPS) {
                $scope.submitRegistration();
            } else {
                $scope.step++;
                registerWizard.formwizard('show', 'register-step' + $scope.step);
            }
        };

        $scope.togglePassword = function () {
            if ($scope.inputType == 'password')
                $scope.inputType = 'text';
            else
                $scope.inputType = 'password';
        };

        $scope.backText = function () {
            if ($scope.step === TWO) {
                return "Your Account";
            }
            else if ($scope.step === THREE) {
                return "Your Business";
            }
            else if ($scope.step === FOUR) {
                return "Tablet Images";
            }
        };

        $scope.nextText = function () {
            if ($scope.step === TWO) {
                return "Tablet Images";
            }
            else if ($scope.step === THREE) {
                return "First Employee";
            }
            else if ($scope.step === FOUR) {
                return "Enter the Site";
            }
        };

        $scope.alert = {
            success: 'Registration',
            warning: 'Warning',
            danger: 'Danger'
        };

        $scope.doLogin = function() {
            AuthenticationService.login(
                {
                    'email': $scope.register.step1.email,
                    'password': $scope.register.step1.password,
                },
                // Success
                function(userObj) {
                    BusinessService.getBusinessSubdomain(
                        userObj.user.business,
                        userObj.token,
                        function(subdomain) {
                            var cookieDefaults = {
                                'path': '/',
                            };
                            var path = '/app';
                            if (userObj.user.role < 0) {
                                path = '/vip';
                            }
                            $cookies.putObject('user', userObj.user, cookieDefaults);
                            $cookies.put('token', userObj.token, cookieDefaults);

                            var domain = $location.host().replace(/[a-zA-Z]*\./,""); // Removes any subdomain.
                            console.log('http://' + subdomain + '.' + domain + ':' + $location.port() + path);
                            $window.location.href = 'http://' + subdomain + '.' + domain + ':' + $location.port() + path;
                        },
                        function(err) {
                            $trace('log in fail');
                        }
                    );
                },
                // Failure
                function(err) {
                    $scope.alert.danger = err.errorMsg;
                }
            );
        };

        $scope.submitRegistration = function () {
            AuthenticationService.register({
                    'role': '2',
                    'name': $scope.register.step1.fullName,
                    'email': $scope.register.step1.email,
                    'password': $scope.register.step1.password,
                    'phone': $scope.register.step1.phone,
                    'businessName': $scope.register.step2.businessName
                },

                // Success
                function (regObj) {
                    $trace('register success');
                    //
                    // Automatically log-in after registration
                    //
                    $scope.doLogin();
                },

                // Error
                function (err) {
                    $trace('register fail');
                }
            );
        };

        // Initialize Dropzones
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

        // Get the progress bar and change its width when a step is shown
        var progressBar = $('#progress-bar-wizard');
        progressBar
            .css('width', '33%')
            .attr('aria-valuenow', '33');

        $("#register-wizard").bind('step_shown', function (event, data) {
            if (data.currentStep === 'register-step1') {
                progressBar
                    .css('width', '25%')
                    .attr('aria-valuenow', '25')
                    .removeClass('progress-bar-warning progress-bar-info progress-bar-success')
                    .addClass('progress-bar-danger');
            }
            else if (data.currentStep === 'register-step2') {
                progressBar
                    .css('width', '50%')
                    .attr('aria-valuenow', '50')
                    .removeClass('progress-bar-danger progress-bar-info progress-bar-success')
                    .addClass('progress-bar-warning');
            }
            else if (data.currentStep === 'register-step3') {
                progressBar
                    .css('width', '75%')
                    .attr('aria-valuenow', '75')
                    .removeClass('progress-bar-warning progress-bar-danger progress-bar-success')
                    .addClass('progress-bar-info');
            } else if (data.currentStep === 'register-step4') {
                progressBar
                    .css('width', '100%')
                    .attr('aria-valuenow', '100')
                    .removeClass('progress-bar-danger progress-bar-warning progress-bar-info')
                    .addClass('progress-bar-success');
            }
        });

        // Docs: http://jqueryvalidation.org/documentation/
        $('#register-wizard').formwizard({
            disableUIStyles: true,
            validationEnabled: true,
            validationOptions: {
                errorClass: 'help-block animation-slideDown', // You can change the animation class for a different entrance animation - check animations page
                errorElement: 'span',
                errorPlacement: function (error, e) {
                    e.parents('.form-group > div').append(error);
                },
                highlight: function (e) {
                    $(e).closest('.form-group').removeClass('has-success has-error').addClass('has-error');
                    $(e).closest('.help-block').remove();
                },
                success: function (e) {
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
                    'register-step1-phone': {
                        required: true,
                        minlength: 7
                    },
                    'register-step1-confirm-password': {
                        required: true,
                        equalTo: '#register-step1-password'
                    },
                    'register-step2-business-name': {
                        required: true,
                        minlength: 2
                    },
                    'register-step2-business-phone': {
                        required: true,
                        minlength: 7
                    },
                    'register-step4-name': {
                        required: false,
                        minlength: 2
                    },
                    'register-step4-email': {
                        required: false,
                        email: true
                    },
                    'register-step4-phone': {
                        required: false,
                        minlength: 7
                    }
                },
                messages: {
                    'register-step1-email': 'Please enter a valid email address',
                    'register-step1-terms': 'Please accept the terms to continue',
                    'register-step1-phone': 'Please enter a valid phone number',
                    'register-step2-business-phone': 'Please enter a valid phone number'

                }
            },
            inDuration: 0,
            outDuration: 0
        });

        $scope.termsHandler = function (isChecked) {
            if (isChecked) {
                $scope.disableNextButton = false;
            } else {
                $scope.disableNextButton = true;
            }
        };
    });
