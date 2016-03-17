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
        $scope.visitors = [{
            'name': 'Peter Yao',
            'timeStamp': {
                'created': Date.now(),
                'updated': Date.now()
            },
            'phone': '6261234567'
        }];

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
            $trace(date);
            var searchDate = (date.getMonth()+1) + "-" + date.getDate() + "-" + date.getFullYear();
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
                },
                function (err) {
                    $trace("Delete Visitor Failed: " + visObj);
                }
            );
        };

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

        //$scope.currSorted = $('#name_categ');
        //$scope.currSorted.addClass('activeCategory');
        //
        ////sort the chart
        //$scope.sortBy = function(category) {
        //    switch(category) {
        //        case 'name':
        //            if (lastSort==='name') {
        //                $scope.inactive.reverse();
        //                lastSort='name';
        //            }
        //            else {
        //                $scope.inactive.sort(function(a,b) {
        //                    if (a.name < b.name)
        //                        return -1;
        //                    else if (a.name > b.name)
        //                        return 1;
        //                    else
        //                        return 0;
        //                });
        //                lastSort='name';
        //            }
        //
        //            $scope.currSorted.removeClass('activeCategory');
        //            $scope.currSorted = $('#name_categ');
        //            $scope.currSorted.addClass('activeCategory');
        //
        //            break;
        //        case 'employee':
        //            if (lastSort==='employee') {
        //                $scope.inactive.reverse();
        //                lastSort='employee';
        //            }
        //            else {
        //                $scope.inactive.sort(function(a,b) {
        //                    return a.numEmployees-b.numEmployees;
        //                });
        //                lastSort='employee';
        //            }
        //
        //            $scope.currSorted.removeClass('activeCategory');
        //            $scope.currSorted = $('#emp_categ');
        //            $scope.currSorted.addClass('activeCategory');
        //
        //            break;
        //        case 'notes':
        //            if (lastSort==='notes') {
        //                $scope.inactive.reverse();
        //                lastSort='notes';
        //            }
        //            else {
        //                $scope.inactive.sort(function(a,b) {
        //                    return a.numVisitors-b.numVisitors;
        //                });
        //                lastSort='notes';
        //            }
        //
        //            $scope.currSorted.removeClass('activeCategory');
        //            $scope.currSorted = $('#notes_categ');
        //            $scope.currSorted.addClass('activeCategory');
        //
        //            break;
        //        case 'phone':
        //            if (lastSort==='phone') {
        //                $scope.inactive.reverse();
        //                lastSort='phone';
        //            }
        //            else {
        //                // NOT SURE HOW TO SORT DATES YET, WAITING TO SEE HOW STRUCTURED IN JSON OBJECT
        //                lastSort='phone';
        //            }
        //
        //            $scope.currSorted.removeClass('activeCategory');
        //            $scope.currSorted = $('#phone_categ');
        //            $scope.currSorted.addClass('activeCategory');
        //
        //            break;
        //        default:
        //            break;
        //    }
        //};

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

        $scope.showVisitorBlock = false;
        $scope.activeVisitor = {};
        $scope.hoverVisitor = function(v) {
            $scope.showVisitorBlock = true;
            $scope.activeVisitor = v;
        };
        $scope.selectVisitor = function(v) {
            $scope.showVisitorBlock = true;
            $scope.activeVisitor = v;
        };
        $scope.deselectVisitor = function() {
            $scope.showVisitorBlock = false;
            $scope.activeVisitor = {};
        }
    });
