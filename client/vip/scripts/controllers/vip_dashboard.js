/**
 * @ngdoc function
 * @name iReceptionistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
.controller('VipDashboardCtrl', function($scope, $rootScope, $cookies, BusinessService, AnalyticsService) {
    $rootScope.currentState = 'vip-dashboard';

    $scope.getAnalyticsUse = function () {
        AnalyticsService.getAnalyticsUser(
            '03-10-2016',
            '03-16-2016',
            function (analyticsObject) {
                $trace("Suspended business: " + analyticsObject);
                $scope.allAnalytics=analyticsObject;
                //$scope.getPlotData();
                console.log(analyticsObject);
            },
            function (err) {
                $trace("Suspend business fail: " + err);
            }
        );  
    };
    
    $scope.getAnalyticsVis = function () {
        AnalyticsService.getAnalyticsVisitor(
            $cookies.get('token'),
            '03-10-2016',
            '03-16-2016',
            function (analyticsObject) {
                $trace("Suspended business: " + analyticsObject);
                console.log(analyticsObject);
            },
            function (err) {
                $trace("Suspend business fail: " + err);
            }
        );  
    };
    
    $scope.getAnalyticsUse();
 
    $scope.suspendBusiness = function() {
        var businessID = $scope.clientsToShow[this.$index]._id;
        var suspendedToggle = !$scope.clientsToShow[this.$index].suspended;
        console.log(businessID);
        console.log(suspendedToggle);
        $scope.indexToChange=this.$index;
        BusinessService.suspendBusiness(
            businessID,
            suspendedToggle, // Toggle the current suspension -- if true, send false, if false, send true
            $cookies.get('token'),
            function (busObj) {
                $trace("Suspended business: " + busObj);
                $scope.showSuspended($scope.indexToChange);
            },
            function (err) {
                $trace("Suspend business fail: " + err.errorMsg);
            }
        );
    };
    
    //test with fake data if true or fetch data from db
    var getClientsDB = function() {
        BusinessService.getBusinessList(
            $cookies.get('token'), 
            function (busObj) {
                $scope.clients = busObj;
                $scope.continue();
                $trace("Grabbing active clients: ");
                $trace(busObj);
            },
            function (err) {
                $scope.alert.danger = err.errorMsg;
            }
        );
    };
    
    var testMode = false;
    if (testMode) {
        $scope.clients = [
        {
            'name': 'Alfred',
            'numEmployees': 15,
            'numVisitors': 422,
            'joined': Date(),
            'plan': 4
        },
        {
            'name': 'Abby',
            'numEmployees': 234,
            'numVisitors': 122,
            'joined': Date(),
            'plan': 3
        },
        {
            'name': 'Robert',
            'numEmployees': 421,
            'numVisitors': 1,
            'joined': Date(),
            'plan': 2
        },
        {
            'name': 'Amanda',
            'numEmployees': 43,
            'numVisitors': 23,
            'joined': Date(),
            'plan': 1
        },
        {
            'name': 'Venkman',
            'numEmployees': 1,
            'numVisitors': 53223,
            'joined': Date(),
            'plan': 2
        },
        {
            'name': 'Peter',
            'numEmployees': 4234,
            'numVisitors': 22,
            'joined': Date(),
            'plan': 2
        },
        {
            'name': 'Peter',
            'numEmployees': 41,
            'numVisitors': 232,
            'joined': Date(),
            'plan': 3
        },
        {
            'name': 'Peter',
            'numEmployees': 334,
            'numVisitors': 664,
            'joined': Date(),
            'plan': 4
        },
        {
            'name': 'Peter',
            'numEmployees': 214,
            'numVisitors': 2512,
            'joined': Date(),
            'plan': 2
        },
        {
            'name': 'Peter',
            'numEmployees': 24,
            'numVisitors': 11,
            'joined': Date(),
            'plan': 3
        },
        {
            'name': 'Peter',
            'numEmployees': 44,
            'numVisitors': 250,
            'joined': Date(),
            'plan': 2
        },
        {
            'name': 'Peter',
            'numEmployees': 114,
            'numVisitors': 21200,
            'joined': Date(),
            'plan': 1
        },
        {
            'name': 'Powell',
            'numEmployees': 452,
            'numVisitors': 202420,
            'joined': Date(),
            'plan': 3
        },
        {
            'name': 'Joe',
            'numEmployees': 241,
            'numVisitors': 423,
            'joined': Date(),
            'plan': 1
        },
    ];
    }
    else {
        getClientsDB();   //gets full business list.
    }
    
    
    
    //had to add this hack to not load rest of page until the business list is successfully loaded.
    $scope.continue = function() {
        //initally show all clients
        $scope.clientsToShow=$scope.clients;
        
        //initialize dates/suspended
        for (var i=0; i<$scope.clients.length; i++) {
            
            
            if ($scope.clients[i].suspended) {  
                updateSuspension(true, i);
            }
            else {
                updateSuspension(false, i);
            }
        }
        
        /*
         * Flot Charts Jquery plugin is used for charts
         *
         * For more examples or getting extra plugins you can check http://www.flotcharts.org/
         * Plugins included in this template: pie, resize, stack, time
         */
        var widgetChartPie = $('#widget-chart-pie');

        console.log($scope.allAnalytics.basic.count);
        var freePct = $scope.allAnalytics.free.count;
        var basicPct = $scope.allAnalytics.basic.count;
        var premPct = $scope.allAnalytics.premier.count;
        $scope.totalClients = freePct+basicPct+premPct;
        $.plot(widgetChartPie,
            [
                {label: 'Free', data: freePct},
                {label: 'Basic', data: basicPct},
                {label: 'Premier', data: premPct},
            ],
            {
                colors: ['#f54e59', '#5cafde', '#7cdd7e'],
                legend: {show: false},
                series: {
                    pie: {
                        show: true,
                        radius: 1,
                        label: {
                            show: true,
                            radius: 2/3,
                            formatter: function(label, pieSeries) {
                                $trace(label);
                                return '<div class="chart-pie-label">' + label + '<br>' + Math.round(pieSeries.percent) + '%</div>';
                            },
                            background: {opacity: .75, color: '#000000'}
                        }
                    }
                }
            }
        );

        //highlight name to start
        $scope.currSorted = $('#name_categ');
        $scope.currIcon = $('#plan_icon');
        $scope.currSorted.addClass('activeCategory');

        // ALL INITIAL VALUES SET HERE //
        $scope.lastSort = '';
        var initialPlot = 'total_clients';

        //initially plot total_clients
        $scope.plotNewData(initialPlot);

        //initially sort by name
        $scope.sortBy('name');
    };
    
    //sort the chart
    $scope.sortBy = function(category) {
        switch(category) {
            case 'name':
                if ($scope.lastSort==='name') {
                    $scope.clients.reverse();
                    $scope.lastSort='name';

                    swapIcons('#name_icon', true);
                }
                else {
                    $scope.clients.sort(function(a,b) {
                        if (a.name.toLowerCase() < b.name.toLowerCase())
                            return -1;
                        else if (a.name.toLowerCase() > b.name.toLowerCase())
                            return 1;
                        else 
                            return 0;
                    });
                    $scope.lastSort='name';

                    swapIcons('#name_icon', false);
                }

                $scope.currSorted.removeClass('activeCategory');
                $scope.currSorted = $('#name_categ');
                $scope.currIcon = $('#name_icon');
                $scope.currSorted.addClass('activeCategory');

                break;
            case 'joined':
                if ($scope.lastSort==='joined') {
                    $scope.clients.reverse();
                    $scope.lastSort='joined';

                    swapIcons('#join_icon', true);
                }
                else {
                    $scope.clients.sort(function(a,b) {
                        if (a.suspended | b.suspended) {
                            if (a.suspended) {
                                return 1;
                            }
                            else {
                                return -1;
                            }
                        }
                        return Date.parse(a.timeStamp.created)-Date.parse(b.timeStamp.created);
                    });                 
                    $scope.lastSort='joined';

                    swapIcons('#join_icon', false);                 
                }

                $scope.currSorted.removeClass('activeCategory');
                $scope.currSorted = $('#join_categ');
                $scope.currIcon = $('#join_icon');
                $scope.currSorted.addClass('activeCategory');

                break;
            case 'plan':
                if ($scope.lastSort==='plan') {
                    $scope.clients.reverse();
                    $scope.lastSort='plan';

                    swapIcons('#plan_icon', true);
                }
                else {
                    $scope.clients.sort(function(a,b) {
                        var plans = ['free', 'basic', 'premier'];
                        return plans.indexOf(a.planLevel.toLowerCase())-plans.indexOf(b.planLevel.toLowerCase());
                    });
                    $scope.lastSort='plan';

                    swapIcons('#plan_icon', false);
                }

                $scope.currSorted.removeClass('activeCategory');
                $scope.currSorted = $('#plan_categ');
                $scope.currIcon = $('#plan_icon');
                $scope.currSorted.addClass('activeCategory');   

                break;
            default:
                break;
        }
    };
    
    //idToSwap is the id of icon and reverse is boolean t/f if list was reversed
    function swapIcons(idToSwap, reverse) {
            if (reverse) {
                if($(idToSwap).hasClass('hi-sort-by-attributes')) {
                    $(idToSwap).removeClass('hi-sort-by-attributes');
                    $(idToSwap).addClass('hi-sort-by-attributes-alt');
                }
                else if ($(idToSwap).hasClass('hi-sort')) {
                    $(idToSwap).removeClass('hi-sort');    
                    $(idToSwap).addClass('hi-sort-by-attributes');
                }
                else {
                    $(idToSwap).removeClass('hi-sort-by-attributes-alt');
                    $(idToSwap).addClass('hi-sort-by-attributes');
                }
            }
            else {
                $(idToSwap).removeClass('hi-sort');    
                $(idToSwap).addClass('hi-sort-by-attributes');
                
                
                $scope.currIcon.removeClass('hi-sort-by-attributes-alt');
                $scope.currIcon.removeClass('hi-sort-by-attributes');
                $scope.currIcon.addClass('hi-sort');
                $scope.currIcon = $('idToSwap');
            }
        }
    
    $scope.showSuspended = function(indToChange) {
        console.log(indToChange);
        if( $('#dateJoined'+indToChange).hasClass('SUSPENDED')) {
            $('#dateJoined'+indToChange).removeClass('SUSPENDED');
            updateSuspension(false, indToChange);
        }
        else {
            $('#dateJoined'+indToChange).addClass('SUSPENDED');
            updateSuspension(true, indToChange);
        }
    };
    
    //suspends/unsuspends business
    var updateSuspension = function(trueIfSus, indexIntoClients) {
        if (trueIfSus) { //suspend
            $scope.clientsToShow[indexIntoClients].dateJoined='SUSPENDED';
        }
        else { //unsuspend
            var monthsToPrint = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var dateObj =  new Date($scope.clientsToShow[indexIntoClients].timeStamp.created);

            var dayStr = dateObj.getDate();
            var monthStr = monthsToPrint[dateObj.getMonth()];
            var yearStr = dateObj.getFullYear();

            $scope.clientsToShow[indexIntoClients].dateJoined = monthStr + ' ' + dayStr + ', ' + yearStr;
        }
    }
    
    //not used for demo because we don't have enough data in DB.
    $scope.getPlotData = function() {
        var freeDict = {};
        var basicDict = {};
        var premierDict = {};
        
        for (var key in $scope.allAnalytics.free.timeStamps) {
            var keyVal = key.slice(0,2);
            var countKey = $scope.allAnalytics.free.timeStamps[key].count;
            if (freeDict[keyVal] === undefined) {
                freeDict[keyVal]=countKey;
            }
            else {
                freeDict[keyVal]=freeDict[keyVal]+countKey;
            }
        }
        
        for (var key in $scope.allAnalytics.basic.timeStamps) {
            var keyVal = key.slice(0,2);
            var countKey = $scope.allAnalytics.basic.timeStamps[key].count;
            if (basicDict[keyVal] === undefined) {
                basicDict[keyVal]=countKey;
            }
            else {
                basicDict[keyVal]=basicDict[keyVal]+countKey;
            } 
        }
        
        for (var key in $scope.allAnalytics.premier.timeStamps) {
            var keyVal = key.slice(0,2);
            var countKey = $scope.allAnalytics.premier.timeStamps[key].count;
            if (premierDict[keyVal] === undefined) {
                premierDict[keyVal]=countKey;
            }
            else {
                premierDict[keyVal]=premierDict[keyVal]+countKey;
            }
        }
        console.log(freeDict);
        console.log(basicDict);
        console.log(premierDict);
        
        //new clients
        var keyList = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        var newClients = [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0]];
        for (var key in freeDict) {
            newClients[keyList.indexOf(key)][1]+=freeDict[key];
        }
        for (var key in basicDict) {
            newClients[keyList.indexOf(key)][1]+=basicDict[key];
        }
        for (var key in premierDict) {
            newClients[keyList.indexOf(key)][1]+=premierDict[key];
        }
        console.log(newClients);
        
        //totalClients
        var totalClients = $.extend(true, [], newClients); //make deep copy
        for (var i=0; i<12; i++) {
            for (var j=0; j<i; j++) {
                totalClients[i][1]=totalClients[i][1]+newClients[j][1];
            }
        }
        console.log(totalClients);
    }
    
    //plots whichever top category you pick
    $scope.plotNewData = function(whichData) {
            var dataMonths = [[1, 'Jan'], [2, 'Feb'], [3, 'Mar'], [4, 'Apr'], [5, 'May'], [6, 'Jun'], [7, 'Jul'], [8, 'Aug'], [9, 'Sep'], [10, 'Oct'], [11, 'Nov'], [12, 'Dec']];
            var dataToPlot = [];
            var updateData = function(whichData) {
                // hard coded for now until get routes from backend
                switch(whichData) {
                    case 'total_clients':
                        return ['Total Clients','#afde5c', [1, 100], [2, 210], [3, 220], [4, 250], [5, 250], [6, 310], [7, 360], [8, 361], [9, 460], [10, 490], [11, 500], [12, 520]];
                    case 'employees_client':
                        return ['Employees per Client','#deb25c', [1, 23], [2, 25], [3, 22], [4, 26], [5, 29], [6, 25], [7, 28], [8, 33], [9, 29], [10, 30], [11, 29], [12, 34]];
                    case 'new_clients':
                        return ['New Clients','rgb(222,75,57)', [1, 50], [2, 39], [3, 22], [4, 51], [5, 54], [6, 80], [7, 44], [8, 83], [9, 66], [10, 87], [11, 71], [12, 102]];
                    case 'total_income':
                        return ['Total Income','#de815c', [1, 1530], [2, 2330], [3, 3220], [4, 4330], [5, 5510], [6, 6765], [7, 7780], [8, 8380], [9, 9120], [10, 9330], [11, 10090], [12, 10410]];
                    default:
                        return ['Total Clients','#afde5c', [1, 100], [2, 210], [3, 220], [4, 250], [5, 250], [6, 310], [7, 360], [8, 361], [9, 460], [10, 490], [11, 500], [12, 520]]; //clients by default
                }
            };

            dataToPlot = updateData(whichData);

            var categoryPlotted = dataToPlot.shift();
            var colorToPlot = dataToPlot.shift();

            var chartClassicDash = $('#chart-classic-dash');

            $.plot(chartClassicDash,
                [
                    {
                        label: categoryPlotted,
                        data: dataToPlot,
                        lines: {show: true, fill: true, fillColor: {colors: [{opacity: .6}, {opacity: .6}]}},
                        points: {show: true, radius: 5}
                    },
                ],
                {
                    colors: [colorToPlot],
                    legend: {show: true, position: 'nw', backgroundOpacity: 0},
                    grid: {borderWidth: 0, hoverable: true, clickable: true},
                    yaxis: {show: false, tickColor: '#f5f5f5', ticks: 3},
                    xaxis: {ticks: dataMonths, tickColor: '#f9f9f9'}
                }
            );

            // Creating and attaching a tooltip to the classic chart
            var previousPoint = null, ttlabel = null;
            chartClassicDash.bind('plothover', function(event, pos, item) {

                if (item) {
                    if (previousPoint !== item.dataIndex) {
                        previousPoint = item.dataIndex;

                        $('#chart-tooltip').remove();
                        var x = item.datapoint[0], y = item.datapoint[1];

                        if (item.seriesIndex === 0) {
                            ttlabel = '<strong>' + y + '</strong>';
                        } else if (item.seriesIndex === 1) {
                            ttlabel = '<strong>' + y + '</strong> sales';
                        } else {
                            ttlabel = '<strong>' + y + '</strong> vtickets';
                        }

                        $('<div id="chart-tooltip" class="chart-tooltip">' + ttlabel + '</div>')
                            .css({top: item.pageY - 45, left: item.pageX + 5}).appendTo("body").show();
                    }
                }
                else {
                    $('#chart-tooltip').remove();
                    previousPoint = null;
                }
            });
        };
    
    //search the list of clients
    $('#chartSearch').keyup(function() {
        var searchVal = $('#chartSearch').val().toLowerCase();
        if (searchVal == '') {
            $scope.clientsToShow=$scope.clients;
        }
        else {
            var clientList = [];
            for (var i=0; i<$scope.clients.length; i++) {
                var clientName = $scope.clients[i].name.toLowerCase();
                if (clientName.includes(searchVal)) {
                    clientList.push($scope.clients[i]);
                }
            }
            $scope.clientsToShow=clientList;
        }
        $scope.$digest();
    });

});


    




