/**
 * @ngdoc function
 * @name iReceptionistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
.controller('IndexCtrl', function($scope, $rootScope) {
    console.log('IndexCtrl loaded.');

    $rootScope.pageContentWidth = function() {
        return $('#page-content').width();
    };
    $rootScope.pageContentHeight = function() {
        return $('#page-content-ui-view').innerHeight();
    };

    $('#page-content').resize(function() {
        $('#page-content-ui-view').width($rootScope.pageContentWidth());
        $('#page-content').height($rootScope.pageContentHeight());
    });


});
