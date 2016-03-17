/**
 * @ngdoc function
 * @name iReceptionistApp.controller:SettingsCtrl
 * @description
 * # SettingsFormsCtrl
 * Controller for the settings page
 */
angular.module('iReceptionistApp')
    .controller('SettingsFormsCtrl', function($scope, $builder, $validator, $rootScope, $cookies, BusinessService, UserService) {
        $rootScope.currentState = 'settings-forms';

        if($cookies.get('tourSetF') != -1){
          $scope.currentStepF = 0;
        }
        //$cookies.put('tourSetF',0);
        $scope.tourComplete=function(){
          $trace("tourcompleted" + $scope.currentStepF);
          $cookies.put('tourSetF',-1);
        };

        $scope.business = $cookies.getObject('business');
        var employeeSelectObject = {"id":"employee","component":"select","editable":true,"index":3,"label":"Employee","description":"Who are you seeing today?","placeholder":"placeholder","options":["Anyone is fine"],"required":false,"validation":"/.*/","$$hashKey":"object:61"};

        // Add the employees as options in the employee select
        UserService.getEmployees(
            $cookies.get('token'),
            function(empObj) {
                $scope.employees = empObj;
                $trace("Grabbing employees");

                for (var i = 0; i < $scope.employees.length; i++) {
                    employeeSelectObject.options.push($scope.employees[i]['name']);
                }
            },
            function(err) {
                $trace("Employee list error");
            }
        );

        $scope.employeeSelect = false;
        if ($scope.business.form) {
            var form = JSON.parse($scope.business.form);
            $builder.forms['default'] = form;

            for (var i = 0; i < form.length; i++) {
                if (form[i].hasOwnProperty('id') && form[i]['id'] === 'employee') {
                    $scope.employeeSelect = true;
                    break;
                }
            }
        }
        else {
            // Make the default form
            if (!$builder.forms['default'].length) {
                name = $builder.addFormObject('default', {
                    id: 'name',
                    component: 'textInput',
                    label: 'Name',
                    description: 'Your name',
                    placeholder: 'Your name',
                    required: true,
                    editable: false
                });
            }
        }

        $scope.updateEmployeeSelect = function() {
            if ($scope.employeeSelect) {
                // Add employee select to the form
                $builder.addFormObject('default', employeeSelectObject);
            }
            else {
                // Remove employee select from the form
                var index = -1;
                for (var i = 0; i < $builder.forms['default'].length; i++) {
                    if ($builder.forms['default'][i]['id'] === 'employee') {
                        index = i;
                        break;
                    }
                }
                if (index != -1) {
                    $builder.removeFormObject('default', index);
                }
            }
        };

        $scope.saveForm = function() {
            console.log(JSON.stringify($scope.form));
            BusinessService.updateBusiness(
                {
                    "businessId": $scope.business._id,
                    "form": JSON.stringify($scope.form)
                },
                $cookies.get('token'),
                function (busObj){
                    toastr.success("Your form was updated!");

                    // Update the business cookie
                    $cookies.putObject('business', busObj);
                    console.log(busObj);
                },
                function (err) {
                    toastr.error("Error saving form.");
                    $trace(err);
                }
            );
        };

        $scope.form = $builder.forms['default'];
        $scope.input = [];
        return $scope.submit = function() {
            return $validator.validate($scope, 'default').success(function() {
                return $trace('success');
            }).error(function() {
                return $trace('error');
            });
        };
    });
