/**
 * @ngdoc function
 * @name iReceptionistApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller for the registration page
 */
angular.module('iReceptionistApp')
.controller('RegisterCtrl', function($rootScope, $scope, AuthenticationService) {

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

    // Dropzone Handling - Don't gain much from more Angular based directive/controller structure
    Dropzone.autoDiscover = false;

    // Logo Dropzone
    var logoDrop = new Dropzone("div#logoUpload", {
        uploadMultiple: false,
        parallelUploads: 1,
        maxFiles: 1,
        previewTemplate: document.getElementById('preview-template').innerHTML,
        clickable: '#logoUpload',
        url: "https://api.cloudinary.com/v1_1/phoenix-sol/image/upload"
    });
    logoDrop.on('sending', function (file, xhr, formData) {
        console.log("sending test");
        formData.append('api_key', 652212869154129);
        formData.append('timestamp', Date.now() / 1000 | 0);
        formData.append('upload_preset', 'phtsmngp');
    });
    logoDrop.on('success', function (file, response) {
        console.log('Success! Cloudinary public ID is', response.public_id);
    });
    logoDrop.on('maxfilesexceeded', function(file){
        logoDrop.removeAllFiles();
        logoDrop.addFile(file);
    });

    // Background Dropzone
    var bgDrop = new Dropzone("div#bgUpload", {
        uploadMultiple: false,
        parallelUploads: 1,
        maxFiles: 1,
        previewTemplate: document.getElementById('preview-template').innerHTML,
        clickable: '#bgUpload',
        url: "https://api.cloudinary.com/v1_1/phoenix-sol/image/upload"
    });
    bgDrop.on('sending', function (file, xhr, formData) {
        console.log("sending test");
        formData.append('api_key', 652212869154129);
        formData.append('timestamp', Date.now() / 1000 | 0);
        formData.append('upload_preset', 'phtsmngp');
    });
    bgDrop.on('success', function (file, response) {
        console.log('Success! Cloudinary public ID is', response.public_id);
    });
    bgDrop.on('maxfilesexceeded', function(file){
        bgDrop.removeAllFiles();
        bgDrop.addFile(file);
    });

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
