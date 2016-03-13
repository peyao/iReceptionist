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
		
		// Initialize Datepicker
        $('.input-datepicker, .input-daterange').datepicker({weekStart: 1}).on('changeDate', function(e){ $(this).datepicker('hide'); });

        $scope.user = $cookies.getObject('user');
        $scope.showMine = false;
        $scope.showActive = null;
        $scope.visitors = [];
        $scope.inactive =[];

        var getActive = function(){
            VisitorService.getVisitorQueue(
                1,
                10,
                $cookies.get('token'),
                function (visObj) {
                    $scope.visitors = visObj;
                    $trace("Grabbing active visitors: ");
                    $trace(visObj);
                },
                function (err) {
                    $scope.alert.danger = err.errorMsg;
                }
            );
        };

        var getInactive = function(){
            //TODO: remove date for final - this is for testing - should get date from picker
            var today = new Date();
            $trace((today.getMonth() +1) + "-" + today.getDate() + "-" + today.getFullYear());
            VisitorService.getVisited(
                1,
                10,
                (today.getMonth()+1) + "-" + today.getDate() + "-" + today.getFullYear(),
                $cookies.get('token'),
                function (visObj) {
                    $scope.inactive = visObj;
                    $trace("Grabbing inactive visitors: ");
                    $trace(visObj);
                },
                function (err) {
                    $trace("inactive fail");
                }
            );
        };

        getActive();
        getInactive();
        var pusher = new Pusher('7c84af4dd6941414d752', {
            encrypted: true
        });

        var channel;
        if ($scope.user) {
            channel = pusher.subscribe($scope.user.business);
            channel.bind('newVisitor', function(data){
                getActive();
            });
        }

        $scope.doCheckOff = function (data){
            $trace(data);
            VisitorService.checkOff(
                data._id,
                $cookies.get('token'),
                function (visObj){
                    $trace("Checked off: " + visObj);
                    getActive();
                },
                function (err) {
                    $scope.alert.danger = err.errorMsg;
                }
            );
        };

        $scope.doDelete = function (data){
            VisitorService.deleteVisitor(
                data._id,
                $cookies.get('token'),
                function (visObj){
                    $trace("Deleted: " + visObj);
                    getActive();
                },
                function (err) {
                    $trace("Delete Visitor Failed: " + visObj);
                }
            );
        }

        var chartClassicDash = $('#chart-classic-dash');
        $.plot(chartClassicDash,
            [
                {
                    label: 'Number of Visitors',
                    data: [[1, 130], [2, 330], [3, 220], [4, 350], [5, 150], [6, 275], [7, 280], [8, 380], [9, 120], [10, 330], [11, 190], [12, 410]],
                    lines: {show: true, fill: true, fillColor: {colors: [{opacity: .6}, {opacity: .6}]}},
                    points: {show: true, radius: 5}
                },
            ],
            {
                colors: ['#5ccdde'],
                legend: {show: true, position: 'nw', backgroundOpacity: 0},
                grid: {borderWidth: 0, hoverable: true, clickable: true},
                yaxis: {show: false, tickColor: '#f5f5f5', ticks: 3},
                xaxis: {ticks: [[1, 'Jan'], [2, 'Feb'], [3, 'Mar'], [4, 'Apr'], [5, 'May'], [6, 'Jun'], [7, 'Jul'], [8, 'Aug'], [9, 'Sep'], [10, 'Oct'], [11, 'Nov'], [12, 'Dec']], tickColor: '#f9f9f9'}
            }
        );
    });
