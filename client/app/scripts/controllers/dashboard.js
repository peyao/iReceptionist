/**
 * @ngdoc function
 * @name iReceptionistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
    .controller('DashboardCtrl', function($rootScope, $scope, $cookies, VisitorService, UserService) {
        $rootScope.currentState = 'dashboard';
        $('#page-content-ui-view').resize(function() {
            $('#page-content-ui-view').width($rootScope.pageContentWidth());
            $('#page-content').height($rootScope.pageContentHeight());
        });

		$scope.showMine = false;
        $scope.showActive = null;
        $scope.visitors = [];

        VisitorService.getVisitorQueue(
            1,
            10,
            $cookies.get('token'),
            function (visObj) {
                $scope.visitors = visObj;
                console.log(visObj);
                console.log("Grabbing them visitors");
            },
            function (err) {
                $scope.alert.danger = err.errorMsg;
            }
        );

        console.log('Authorization:' + 'Bearer ' + $cookies.get('token'));
        var pusher = new Pusher('7c84af4dd6941414d752', {
            encrypted: true
        });

        var businessId;
        UserService.getUserByToken(
            $cookies.get('token'),
            function (userObj){
                console.log("user: " + userObj);
                businessId = userObj.business;
            },
            function (err) {
                $scope.alert.danger = err.errorMsg;
            }
        );
        var channelName = $cookies.get('businessId');
        var channel = pusher.subscribe(channelName);
        channel.bind('newVisitor', function(data){
            VisitorService.getVisitorQueue(
                1,
                10,
                $cookies.get('token'),
                function (visObj) {
                    $scope.visitors = visObj;
                    console.log(visObj);
                    console.log("Grabbing them visitors");
                },
                function (err) {
                    $scope.alert.danger = err.errorMsg;
                }
            );
        });

        $scope.doCheckOff = function (data){
            console.log(data);
            VisitorService.checkOff(
                data._id,
                $cookies.get('token'),
                function (visObj){
                    console.log("Checked off: " + visObj);
                    VisitorService.getVisitorQueue(
                        1,
                        10,
                        $cookies.get('token'),
                        function (visObj) {
                            $scope.visitors = visObj;
                            console.log(visObj);
                            console.log("Grabbing them visitors");
                        },
                        function (err) {
                            $scope.alert.danger = err.errorMsg;
                        }
                    );
                },
                function (err) {
                    $scope.alert.danger = err.errorMsg;
                }
            );
        };


    });
