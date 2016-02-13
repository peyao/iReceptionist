'use strict';

/**
 * @ngdoc function
 * @name iReceptionistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
.controller('IndexCtrl', function($scope, $mdSidenav) {
    console.log('IndexCtrl loaded.');

    $scope.toggleSidenav = function() {
        $mdSidenav('MainSidenav').toggle();
    };

});
