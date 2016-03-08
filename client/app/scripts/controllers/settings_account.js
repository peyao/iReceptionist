/**
 * @ngdoc function
 * @name iReceptionistApp.controller:SettingsCtrl
 * @description
 * # SettingsAccountCtrl
 * Controller for the settings page
 */
angular.module('iReceptionistApp')
    .controller('SettingsAccountCtrl', function($rootScope, $scope, $cookies, DropZone, BusinessService) {
        $rootScope.currentState = 'settings-account';
        $('#page-content-ui-view').resize(function() {
            $('#page-content-ui-view').width($rootScope.pageContentWidth());
            $('#page-content').height($rootScope.pageContentHeight());
        });

        $scope.user = $cookies.getObject('user');

        BusinessService.getBusiness(
            $cookies.get('token'),
            $scope.user.business,
            function (busObj){
                console.log("Business: " + busObj);
                console.log(busObj.name);
            },
            function (err) {
                //$scope.alert.danger = err.errorMsg;
            }
        );

        /* This is how you'll want to call update -- the second argument will need to be an object with ONLY the info
        *  want to change.  So you'll want to check for changes and only include those that are different.
        *  The object MUST include businessId, so don't remove that part
        */
        //BusinessService.updateBusiness(
        //    $cookies.get('token'),
        //    {
        //      "businessId": $scope.user.business
        //    },
        //    function (busObj){
        //        console.log("update success");
        //        console.log(busObj);
        //    },
        //    function (err) {
        //        console.log("update success");
        //    }
        //);

        $scope.avatarUpload = DropZone.createNew('#avatarUpload');
        $scope.logoUpload = DropZone.createNew('#logoUpload');
        $scope.bgUpload = DropZone.createNew('#bgUpload');
    });
