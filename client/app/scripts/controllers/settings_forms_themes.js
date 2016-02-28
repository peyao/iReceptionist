/**
 * @ngdoc function
 * @name iReceptionistApp.controller:SettingsCtrl
 * @description
 * # SettingsFormsThemesCtrl
 * Controller for the settings page
 */
/*angular.module('iReceptionistApp'),
    .controller('SettingsFormsThemesCtrl', function($rootScope, $scope, AppointmentService) {
        $scope.currentState = 'settings-forms-themes';

        console.log('SettingsFormsThemesCtrl loaded.');
    });*/

angular.module('iReceptionistApp')
    .controller('SettingsFormsThemesCtrl', function($scope, $builder, $validator, $rootScope, AppointmentService) {
        $scope.currentState = 'settings-forms-themes';
        console.log('SettingsFormsThemesCtrl loaded.');

        $scope.defaultValue = {};

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
            $scope.defaultValue[name.id] = 'default value';
        }

        $scope.form = $builder.forms['default'];
        $scope.input = [];
        return $scope.submit = function() {
            return $validator.validate($scope, 'default').success(function() {
                return console.log('success');
            }).error(function() {
                return console.log('error');
            });
        };
    });
