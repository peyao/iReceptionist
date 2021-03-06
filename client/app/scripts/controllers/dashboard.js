/**
 * @ngdoc function
 * @name iReceptionistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
    .controller('DashboardCtrl', function($rootScope, $scope, $cookies,
        VisitorService, UserService, AnalyticsService) {

        $rootScope.currentState = 'dashboard';

        if($cookies.get('tourDash') != -1){
          $scope.currentStepD = 0;
        }
          //$cookies.put('tourDash',0);

        $scope.tourComplete=function(){
          $trace("tourcompleted" + $scope.currentStepD);
          $cookies.put('tourDash',-1);
        };
		// Initialize Datepicker
        $('#example-datepicker3').datepicker('setDate', new Date())
            .on('changeDate', function(){
                $trace("Change Date");
                $scope.getInactive();
            });


        var PAGE_DEFAULT = 1;
        var ACTIVE_PER_DEFAULT = 500;
        $scope.totalItems = 0;
        $scope.currentPage = 1;
		$scope.avgWaitTime = "1:30";
        $scope.vname = '';
        $scope.user = $cookies.getObject('user');
        $scope.showMine = false;
        $scope.showActive = null;
        $scope.visitors = [];
        $scope.inactive = [];
        $scope.fullInactive = [];
        $scope.data = {
            availableOptions: [
                {id: '5', name: '5'},
                {id: '10', name: '10'},
                {id: '20', name: '20'},
                {id: '50', name: '50'},
            ],
            perPage : {id: '10', name: '10'},
        };

        var getActive = function(){
            VisitorService.getVisitorQueue(
                PAGE_DEFAULT,
                ACTIVE_PER_DEFAULT,
                $cookies.get('token'),
                function (visObj) {
                    $scope.visitors = visObj;
                    $trace("Grabbing active visitors: ");
                    $trace(visObj);
                },
                function (err) {
                }
            );
        };

        $scope.saveVis = function(v){
          $scope.vname = v.name;
          $scope.vId = v._id;
        };

        $scope.getInactive = function(){
            //TODO: remove date for final - this is for testing - should get date from picker
            var date = $('#example-datepicker3').datepicker('getDate');
            var searchDate = moment(date).add(1,'d').format('MM-DD-YYYY');
            $trace(searchDate);
            $trace($scope.data.perPage.id);
            VisitorService.getVisited(
                $scope.currentPage,
                $scope.data.perPage.id,
                searchDate,
                $cookies.get('token'),
                function (visObj) {
                    $scope.inactive = visObj;
                    $scope.fullInactive = visObj;
                    $trace("Grabbing inactive visitors: ");
                    $trace(visObj);
                },
                function (err) {
                    $trace("inactive fail");
                }
            );
        };

        getActive();
        $scope.getInactive();

        $scope.pageChanged = function() {
            $scope.getInactive();
        };

        var getInactiveTotal = function() {
            var date = $('#example-datepicker3').datepicker('getDate');
            $trace(date);
            var searchDate = (date.getMonth()+1) + "-" + date.getDate() + "-" + date.getFullYear();
            $trace(searchDate);
            VisitorService.getVisited(
                PAGE_DEFAULT,
                1000,
                searchDate,
                $cookies.get('token'),
                function (visObj) {
                    $scope.totalItems = visObj.length;
                    $trace("Total Items:" + $scope.totalItems);
                },
                function (err) {
                    $trace("inactive fail");
                }
            );
        };

        getInactiveTotal();

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
                    $scope.getInactive();
                },
                function (err) {
            //        $scope.alert.danger = err.errorMsg;
                }
            );
        };

        $scope.doDelete = function (){
            VisitorService.deleteVisitor(
                $scope.vId,
                $cookies.get('token'),
                function (visObj){
                    $trace("Deleted: " + visObj);
                    getActive();
                    $scope.getInactive();
                },
                function (err) {
                    $trace("Delete Visitor Failed: " + visObj);
                }
            );
        };

        AnalyticsService.getAnalyticsVisitor(
            $cookies.get('token'),
            moment().format('MM-DD-YYYY'),
            moment().subtract(7,'d').format('MM-DD-YYYY'),
            function(data) {
                console.log(data);
                $scope.chartDataUnformatted = data;
                $scope.numVisitors = data.count;
            },
            function() {}
        );

        var chartClassicDash = $('#chart-classic-dash');
        $.plot(chartClassicDash,
            [
                {
                    label: 'Number of Visitors',
                    data: [[1, 130], [2, 230], [3, 220], [4, 350], [5, 450], [6, 275], [7, 280]], //[8, 380], [9, 120], [10, 330], [11, 190], [12, 410]],
                    lines: {show: true, fill: true, fillColor: {colors: [{opacity: .6}, {opacity: .6}]}},
                    points: {show: true, radius: 5}
                },
            ],
            {
                colors: ['#5ccdde'],
                legend: {show: true, position: 'nw', backgroundOpacity: 0},
                grid: {borderWidth: 0, hoverable: true, clickable: true},
                yaxis: {show: false, tickColor: '#f5f5f5', ticks: 3},
                xaxis: {ticks: [[1, 'Mon'], [2, 'Tues'], [3, 'Wed'], [4, 'Thurs'], [5, 'Fri'], [6, 'Sat'], [7, 'Sun']], tickColor: '#f9f9f9'}
				//xaxis: {ticks: [[1, 'Jan'], [2, 'Feb'], [3, 'Mar'], [4, 'Apr'], [5, 'May'], [6, 'Jun'], [7, 'Jul'], [8, 'Aug'], [9, 'Sep'], [10, 'Oct'], [11, 'Nov'], [12, 'Dec']], tickColor: '#f9f9f9'}
            }
        );

        $('#chartSearch').keyup(function() {
            var searchVal = $('#chartSearch').val().toLowerCase();
            $trace(searchVal);
            $scope.inactive = $scope.fullInactive;
            if (searchVal != '') {
                var inactiveList = [];
                for (var i=0; i<$scope.inactive.length; i++) {
                    $trace($scope.inactive[i].name);
                    var inactiveName = $scope.inactive[i].name.toLowerCase();
                    if (inactiveName.includes(searchVal)) {
                        inactiveList.push($scope.inactive[i]);
                    }
                }
                $scope.inactive=inactiveList;
            }
            $scope.$digest();
        });

        $scope.keyLeaveOut = function(key) {
            if (['_id','businessId', '__v', 'form', 'timeStamp', 'checkOff'].indexOf(key) === -1) {
                return true;
            } else {
                return false;
            }
        }

        $scope.showVisitorBlock = false;
        $scope.activeVisitor = {};
        $scope.hoverVisitor = function(v) {
            $scope.showVisitorBlock = true;
            $scope.activeVisitor = v;
        };
        $scope.deselectVisitor = function() {
            $scope.showVisitorBlock = false;
            $scope.activeVisitor = {};
        }
    });
