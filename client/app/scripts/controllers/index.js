/**
 * @ngdoc function
 * @name iReceptionistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
.controller('IndexCtrl', function($scope, $rootScope, $timeout, $state, $window,
    $cookies, $location, BusinessService) {

    $scope.doLogout = function() {
        $cookies.remove('business', {'path': '/app'});
        var domain = $location.host();
        var urlParts = domain.split('.');
        var tld = '';
        if (urlParts[0] === 'localhost') {
            // localhost
            domain = urlParts[0];
        } else {
            // *.ireceptionist.cf
            domain = urlParts[1];
            tld = '.' + urlParts[2];

            // ireceptionist.cf
            if (!tld) {
                domain = urlParts[0];
                tld = '.' + urlParts[1];
            }
        }
        $window.location.href = 'http://' + domain + tld + ':' + $location.port() + '/auth/#/logout';
    };

    // If user has no token, they are not authorized.
    if (!$cookies.get('token')) {
        $scope.doLogout();
    } else {
        App.togglePageLoading(); // Stop Page Loading
    }

    $scope.user = $cookies.getObject('user');
    $rootScope.publicId = $scope.user.avatar;

    if (!$cookies.get('business')) {
        $trace("business cookie");
        BusinessService.getBusiness(
            $scope.user.business,
            $cookies.get('token'),
            function (busObj){
                $trace("Business: " + busObj);
                $cookies.putObject('business', busObj);
            },
            function (err) {
            }
        );
    }

    var pusher = new Pusher('7c84af4dd6941414d752', {
        encrypted: true
    });

    var channel;
    if ($scope.user && $cookies.getObject('user').settings.receiveBrowserNotification) {
        channel = pusher.subscribe($scope.user.business);
        channel.bind('newVisitor', function(data){
            toastr.options = {
                "positionClass": "toast-bottom-right",
                "timeOut": "2500"
            };
            toastr.info('New visitor added to queue');
        });
    }

    /**
    * Clock Functionality
    */
    $scope.clock = '';
    $scope.tickInterval = 1000; //ms
    var tick = function() {
        $scope.clock = moment().format('LTS');
        $timeout(tick, $scope.tickInterval); // Reset Timer
    };
    // Start the timer
    $timeout(tick, $scope.tickInterval);


    /**
    * Search : Delegates to 'search' state
    */
    $rootScope.searchString = '';
    $scope.search = function(ss) {
        $rootScope.searchString = ss;
        if (!$rootScope.searchString.length) {
            $state.go($rootScope.currentState);
        } else if ($rootScope.currentState === 'search') {
            return;
        } else if ($rootScope.searchString.length) {
            $state.go('search');
        }
    };
});
