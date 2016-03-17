/**
 * @ngdoc function
 * @name iReceptionistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
.controller('VipDashboardCtrl', function($scope, $rootScope, $cookies, BusinessService) {
    $rootScope.currentState = 'vip-dashboard';

    /* Here's an example of how to call suspendBusiness -- when you click on the suspend button for the business, you'll
    need to capture that data and store it somewhere in scope - then you can access it
     */
    //BusinessService.suspendBusiness(
    //    $scope.clickedBusiness.businessId,
    //    !$scope.clickedBusiness.suspended, // Toggle the current suspension -- if true, send false, if false, send true
    //    $cookies.get('token'),
    //    function (busObj) {
    //        $trace("Suspended business: " + busObj);
    //    },
    //    function (err) {
    //        $trace("Suspend business fail: " + busObj);
    //    }
    //);

    //BusinessService.getBusinessList(
    //    $cookies.get('token'),
    //    function (busObj) {
    //        $trace("Business List " + busObj);
    //    },
    //    function (err) {
    //        $trace("Business List error");
    //    }
    //);
    
    $scope.suspendBusiness = function() {
        var businessID = $scope.clientsToShow[this.$index]._id;
        var suspendedToggle = !$scope.clientsToShow[this.$index].suspended;
        BusinessService.suspendBusiness(
            businessID,
            suspendedToggle, // Toggle the current suspension -- if true, send false, if false, send true
            $cookies.get('token'),
            function (busObj) {
                $trace("Suspended business: " + busObj);
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
        
        //initialize dates/suspended
        for (var i=0; i<$scope.clients.length; i++) {
            var monthsToPrint = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            
            if ($scope.clients[i].suspended) {
                $scope.clients[i].dateJoined = 'SUSPENDED';
                $('dateJoined'+i).addClass("suspended");
            }
            else {
                var dateObj =  new Date($scope.clients[i].timeStamp.created);

                var dayStr = dateObj.getDate();
                var monthStr = monthsToPrint[dateObj.getMonth()];
                var yearStr = dateObj.getFullYear();

                $scope.clients[i].dateJoined = monthStr + ' ' + dayStr + ', ' + yearStr;
            }
        }
        
        /*
         * Flot Charts Jquery plugin is used for charts
         *
         * For more examples or getting extra plugins you can check http://www.flotcharts.org/
         * Plugins included in this template: pie, resize, stack, time
         */
        var widgetChartPie = $('#widget-chart-pie');
        $.plot(widgetChartPie,
            [
                {label: 'Free', data: 20},
                {label: 'Basic', data: 10},
                {label: 'Premium', data: 60},
                {label: 'Enterprise', data: 10}
            ],
            {
                colors: ['#454e59', '#5cafde', '#5ccdde', '#fac42e'],
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

        //sort the chart
        $scope.sortBy = function(category) {
            switch(category) {
                case 'name':
                    if (lastSort==='name') {
                        $scope.clients.reverse();
                        lastSort='name';
                        
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
                        lastSort='name';
                        
                        swapIcons('#name_icon', false);
                    }

                    $scope.currSorted.removeClass('activeCategory');
                    $scope.currSorted = $('#name_categ');
                    $scope.currIcon = $('#name_icon');
                    $scope.currSorted.addClass('activeCategory');

                    break;
                case 'joined':
                    if (lastSort==='joined') {
                        $scope.clients.reverse();
                        lastSort='joined';
                        
                        swapIcons('#join_icon', true);
                    }
                    else {
                        $scope.clients.sort(function(a,b) {
                            //var aDate = new Date(a.timeStamp.created);
                            //var bDate = new Date(b.timeStamp.created);
                            return Date.parse(a.timeStamp.created)-Date.parse(b.timeStamp.created);
                        });                 
                        lastSort='joined';
                        
                        swapIcons('#join_icon', false);                 
                    }

                    $scope.currSorted.removeClass('activeCategory');
                    $scope.currSorted = $('#join_categ');
                    $scope.currIcon = $('#join_icon');
                    $scope.currSorted.addClass('activeCategory');

                    break;
                case 'plan':
                    if (lastSort==='plan') {
                        $scope.clients.reverse();
                        lastSort='plan';
                        
                        swapIcons('#plan_icon', true);
                    }
                    else {
                        $scope.clients.sort(function(a,b) {
                            var plans = ['free', 'basic', 'premium', 'enterprize'];
                            return plans.indexOf(a.planLevel.toLowerCase())-plans.indexOf(b.planLevel.toLowerCase());
                        });
                        lastSort='plan';
                        
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
        
        
        

        //plots whichever top category you pick
        $scope.plotNewData = function(whichData) {
            var dataMonths = [[1, 'Jan'], [2, 'Feb'], [3, 'Mar'], [4, 'Apr'], [5, 'May'], [6, 'Jun'], [7, 'Jul'], [8, 'Aug'], [9, 'Sep'], [10, 'Oct'], [11, 'Nov'], [12, 'Dec']];
            var dataToPlot = [];
            var updateData = function(whichData) {
                // hard coded for now until get routes from backend
                switch(whichData) {
                    case 'total_clients':
                        return ['Total Clients','#afde5c', [1, 1900], [2, 2300], [3, 3200], [4, 2500], [5, 4200], [6, 3100], [7, 3600], [8, 2500], [9, 4600], [10, 3700], [11, 4200], [12, 5200]];
                    case 'employees_client':
                        return ['Employees per Client','#deb25c', [1, 850], [2, 750], [3, 1500], [4, 900], [5, 1500], [6, 1150], [7, 1500], [8, 900], [9, 1800], [10, 1700], [11, 1900], [12, 2550]];
                    case 'new_clients':
                        return ['New Clients','rgb(222,75,57)', [1, 130], [2, 330], [3, 220], [4, 350], [5, 150], [6, 275], [7, 280], [8, 380], [9, 120], [10, 330], [11, 190], [12, 410]];
                    case 'total_income':
                        return ['Total Income','#de815c', [1, 1530], [2, 2330], [3, 3220], [4, 4330], [5, 5510], [6, 6765], [7, 7780], [8, 8380], [9, 9120], [10, 9330], [11, 10090], [12, 10410]];
                    default:
                        return ['Total Clients','#afde5c', [1, 1900], [2, 2300], [3, 3200], [4, 2500], [5, 4200], [6, 3100], [7, 3600], [8, 2500], [9, 4600], [10, 3700], [11, 4200], [12, 5200]]; //clients by default
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

        
        
        
        // ALL INITIAL VALUES SET HERE //
        var lastSort = '';
        var initialPlot = 'total_clients';

        //initially plot total_clients
        $scope.plotNewData(initialPlot);

        //initially sort by name
        $scope.sortBy('name');

        //initally show all clients
        $scope.clientsToShow=$scope.clients;
    };

});

    




