/**
 * @ngdoc function
 * @name iReceptionistApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
.controller('AboutCtrl', function($rootScope) {
    $rootScope.toolbarTitle = 'About';

    console.log('AboutCtrl loaded.');
});
