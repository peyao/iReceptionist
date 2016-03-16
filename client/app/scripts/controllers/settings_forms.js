/**
 * @ngdoc function
 * @name iReceptionistApp.controller:SettingsCtrl
 * @description
 * # SettingsFormsCtrl
 * Controller for the settings page
 */
angular.module('iReceptionistApp')
    .controller('SettingsFormsCtrl', function($scope, $builder, $validator, $rootScope, $cookies, FormService, DropZone) {
        $rootScope.currentState = 'settings-forms';

        $scope.business = $cookies.getObject('business').business;
        $scope.form = $cookies.getObject('business').form;
        var employeeSelectObject = {"id":"employee","component":"select","editable":true,"index":3,"label":"Employee","description":"Who are you seeing today?","placeholder":"placeholder","options":["Anyone is fine"],"required":false,"validation":"/.*/","$$hashKey":"object:61"};

        var form = JSON.parse($scope.form);
        $scope.employeeSelect = false;
        if (form != null) {
            for (var i = 0; i < form.length; i++) {
                if (form[i].hasOwnProperty('id') && form[i]['id'] === 'employee') {
                    $scope.employeeSelect = true;
                    break;
                }
            }
        }

        $scope.updateEmployeeSelect = function() {
            if ($scope.employeeSelect) {
                // Add employee select to the form
                $builder.addFormObject('default', employeeSelectObject);
            }
            else {
                // Remove employee select from the form
                var index;
                for (var i = 0; i < $builder.forms['default'].length; i++) {
                    if ($builder.forms['default'][i]['id'] === 'employee') {
                        index = i;
                        break
                    }
                }
                $builder.removeFormObject('default', index);
            }
        };

        /* Add default name field if it hasn't been added already */
        var name;
        var nameAdded = false;
        for (var i = 0; i < $builder.forms['default'].length; i++) {
            if ($builder.forms['default'][i]['id'] === 'name') {
                nameAdded = true;
            }
        }

        if (!nameAdded) {
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
