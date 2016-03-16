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

        $scope.business = $cookies.getObject('business');
        console.log($scope.business);

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
