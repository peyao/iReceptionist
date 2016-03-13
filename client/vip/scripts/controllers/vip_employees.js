/**
 * @ngdoc function
 * @name iReceptionistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
    .controller('VipEmployeesCtrl', function ($scope, $rootScope, $cookies, UserService) {
        $rootScope.currentState = 'vip-employees';
        $('#page-content-ui-view').resize(function () {
            $('#page-content-ui-view').width($rootScope.pageContentWidth());
            $('#page-content').height($rootScope.pageContentHeight());
        });

        $scope.showEmployeesMore = false;
        $scope.employees = [{
            name: 'Amanda',
            phone: '(123) 456-7890',
            email: 'amanda@gmail.com'
        }, {
            name: 'Marco Botton',
            phone: '(123) 456-7890',
            email: 'marco@gmail.com'
        }, {
            name: 'Peter Venkman',
            phone: '(123) 456-7890',
            email: 'venkman@gmail.com'
        }, {
            name: 'Powell',
            phone: '(123) 456-7890',
            email: 'powell@gmail.com'
        }];
        $scope.emp = '';

        $scope.inviteStaff = function () {
            //if ($scope.emp.name && $scope.emp.email && $scope.emp.number) {
            //    $scope.employees.push({
            //        "name": $scope.emp.name,
            //        "email": $scope.emp.email,
            //        "phone": $scope.emp.phone
            //    });
            //}
            UserService.addStaff(
                $scope.emp.name,
                $scope.emp.phone,
                $scope.emp.email,
                $cookies.get('token'),
                function (empObj) {
                    $trace("Added employee " + empObj);
                },
                function (err) {
                    $trace("Add employee error");
                }
            );
        };
    });
