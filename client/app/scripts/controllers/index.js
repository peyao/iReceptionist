'use strict';

/**
 * @ngdoc function
 * @name iReceptionistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
.controller('IndexCtrl', function($scope) {
    console.log('IndexCtrl loaded.');

    $scope.toggleSidebar = function() {
        App.sidebar('toggle-sidebar');
    };

});
