/**
 * @ngdoc function
 * @name iReceptionistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
.controller('VipDashboardCtrl', function($scope, $rootScope) {

    $rootScope.currentState = 'vip-dashboard';
    $('#page-content-ui-view').resize(function() {
        $('#page-content-ui-view').width($rootScope.pageContentWidth());
        $('#page-content').height($rootScope.pageContentHeight());
    });

    $scope.clients = [
        {
            'name': 'Peter',
            'numEmployees': 4,
            'numVisitors': 2000,
            'joined': Date(),
            'plan': 2
        },
        {
            'name': 'Peter',
            'numEmployees': 4,
            'numVisitors': 2000,
            'joined': Date(),
            'plan': 2
        },
        {
            'name': 'Peter',
            'numEmployees': 4,
            'numVisitors': 2000,
            'joined': Date(),
            'plan': 2
        },
        {
            'name': 'Peter',
            'numEmployees': 4,
            'numVisitors': 2000,
            'joined': Date(),
            'plan': 2
        },
        {
            'name': 'Peter',
            'numEmployees': 4,
            'numVisitors': 2000,
            'joined': Date(),
            'plan': 2
        },
        {
            'name': 'Peter',
            'numEmployees': 4,
            'numVisitors': 2000,
            'joined': Date(),
            'plan': 2
        },
        {
            'name': 'Peter',
            'numEmployees': 4,
            'numVisitors': 2000,
            'joined': Date(),
            'plan': 2
        },
        {
            'name': 'Peter',
            'numEmployees': 4,
            'numVisitors': 2000,
            'joined': Date(),
            'plan': 2
        },
        {
            'name': 'Peter',
            'numEmployees': 4,
            'numVisitors': 2000,
            'joined': Date(),
            'plan': 2
        },
        {
            'name': 'Peter',
            'numEmployees': 4,
            'numVisitors': 2000,
            'joined': Date(),
            'plan': 2
        },
        {
            'name': 'Peter',
            'numEmployees': 4,
            'numVisitors': 2000,
            'joined': Date(),
            'plan': 2
        },
        {
            'name': 'Peter',
            'numEmployees': 4,
            'numVisitors': 2000,
            'joined': Date(),
            'plan': 2
        },
        {
            'name': 'Peter',
            'numEmployees': 4,
            'numVisitors': 2000,
            'joined': Date(),
            'plan': 2
        },
        {
            'name': 'Peter',
            'numEmployees': 4,
            'numVisitors': 2000,
            'joined': Date(),
            'plan': 2
        },
    ];
});
