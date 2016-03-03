/**
 * @ngdoc function
 * @name iReceptionistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
    .controller('DashboardCtrl', function($rootScope, $scope, $cookies, VisitorService) {
        $rootScope.currentState = 'dashboard';
        $('#page-content-ui-view').resize(function() {
            $('#page-content-ui-view').width($rootScope.pageContentWidth());
            $('#page-content').height($rootScope.pageContentHeight());
        });

		$scope.showMine = false;
        $scope.showActive = true;
        $scope.visitors = [];

        VisitorService.getVisitorQueue(
            1,
            10,
            $cookies.get('token'),
            function(visObj){
                $scope.visitors = visObj;
                console.log(visObj);
                console.log("Grabbing them visitors");
            },
            function(err) {
                $scope.alert.danger = err.errorMsg;
            }
        );


    });
