/**
 * Created by Amanda on 3/3/2016.
 */
angular.module('iReceptionistApp')
.controller('CheckinCtrl', function($scope, $builder, $rootScope, $cookies, VisitorService, BusinessService) {
    $scope.showFirst=true;
    $scope.showSecond=false;

    $scope.business = $cookies.getObject('business');
    var form = JSON.parse($scope.business.form);
    $builder.forms['visitorForm'] = form;


    var working = false;
    $('.login').on('submit', function (e) {
        $trace('submitted checkin');
        e.preventDefault();
        if (working) return;
        working = true;
        $('.spinner').show();
        var $this = $(this),
            $state = $this.find('button > .check');
        $this.addClass('loading');
        $state.html('Checking You In...');
        setTimeout(function () {
            $this.addClass('ok');
            $state.html('Thank you! You will be called shortly.');
            setTimeout(function () {
                $state.html('Check In');
                $this.removeClass('ok loading');
                working = false;
                $('.spinner').hide();
                $scope.$apply(function(){
                   $scope.showFirst=true;
                   $scope.showSecond=false;
                });
            }, 4000);
        }, 3000);
    });

    $scope.gotoCheckIn = function(){
        $scope.showFirst=false;
        $scope.showSecond=true;
        console.log('go to checkin page');
    };

    $scope.doCheckIn = function(){

        $trace($scope.fstname + " " + $scope.lstname);
        $trace($cookies.get('token'));
        VisitorService.checkin(
            {
                'name' : $scope.fstname + " " + $scope.lstname,
                'phone': $scope.phonenum
            },
            $cookies.get('token'),
            function(){
                $trace("Success new visitor");
                $scope.fstname = null;
                $scope.lstname = null;
                $scope.phonenum = null;
            },
            function(err) {
                $scope.alert.danger = err.errorMsg;
            }
        );
        $scope.showFirst=false;
        $scope.showSecond=true;
    };


});



