/**
 * @ngdoc function
 * @name iReceptionistApp.controller:EmployeeCtrl
 * @description
 * # EmployeeCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
    .controller('EmployeesCtrl', function ($rootScope, $scope, $cookies, UserService) {
        $rootScope.currentState = 'employees';
        

        $scope.showEmployeesMore = false;
        $scope.employees = [];
        $scope.emp = '';
        $scope.name = '';
        $scope.email = '';
        $scope.phone = '';
        $scope.editEmp = {};
        $scope.newEmp = {};

        var getEmployeeList = function () {
            UserService.getEmployees(
                $cookies.get('token'),
                function (empObj) {
                    $scope.employees = empObj;
                    console.log("Grabbing them employees: " + empObj);
                },
                function (err) {
                    console.log("Employee list error");
                }
            );
        };

        getEmployeeList();

        $scope.cancel = function () {
            console.log('resetting form')
            $scope.editEmp = {};
            $scope.newEmp = {};
            $scope.editEmp.phone = '';
            $scope.editEmp.name = '';
            $scope.editEmp.email = '';
            $scope.editForm.$setPristine();
            $scope.newEmp.number = '';
            $scope.newEmp.name = '';
            $scope.newEmp.email = '';
            $scope.inviteForm.$setPristine();
        };


        $scope.addEmployee = function () {
            UserService.addEmployee({
                    "name": $scope.newEmp.name,
                    "phone": $scope.newEmp.phone,
                    "email": $scope.newEmp.email,
                },
                $cookies.get('token'),
                function (empObj) {
                    console.log("Added employee " + empObj.name);
                    //TODO: PUSHER
                    getEmployeeList();
                },
                function (err) {
                    console.log("Add employee error");
                }
            );
            $scope.newEmp = {};
            $('#inviteEmp').modal('hide');

        };

        $scope.saveEmp = function (e) {
            $scope.name = e.name;
            $scope.email = e.email;
            $scope.phone = e.phone;
            $scope.userID = e._id;
            $scope.role = e.role;
            $scope.editEmp.name = e.name;
            $scope.editEmp.email = e.email;
            $scope.editEmp.phone = e.phone;
            $scope.editEmp.userID = e._id;
            console.log("Employee" + $scope.name + "Role" + $scope.role);
        };

        $scope.editEmployee = function (emp) {
            UserService.updateEmployee({
                    "name": $scope.editEmp.name,
                    "email": $scope.editEmp.email,
                    "phone": $scope.editEmp.phone,
                    "userId": $scope.userID,
                },
                $cookies.get('token'),
                function (userObj) {
                    getEmployeeList();
                    console.log("Update employee: " + userObj);

                },
                function (err) {
                    console.log("Update employee error");
                    console.log("ID" + $scope.userID);

                }
            );
            $('#editEmp').modal('hide');

        };

        $scope.deleteUser = function () {
            console.log($scope.userID);
            UserService.deleteEmployee(
                $scope.userID,
                $cookies.get('token'),
                function (empObj) {
                    console.log("Deleted employee: " + empObj);
                    //TODO: PUSHER
                    getEmployeeList();

                },
                function (err) {
                    console.log("Delete employee error");
                }
            );
        };

        //UserService.updateUser(
        //    $cookies.get('token'),
        //    {
        //        "field": "value",
        //        "field": "value"
        //    },
        //    function (userObj) {
        //        console.log("Update employee: " + userObj);
        //    },
        //    function (err) {
        //        console.log("Update employee error");
        //    }
        //);


        console.log('EmployeesCtrl loaded.');
    })
    .filter('tel', function () {
        return function (tel) {
            if (!tel) {
                return '';
            }

            var value = tel.toString().trim().replace(/^\+/, '');

            if (value.match(/[^0-9]/)) {
                return tel;
            }

            var country, city, number;

            switch (value.length) {
                case 10: // +1PPP####### -> C (PPP) ###-####
                    country = 1;
                    city = value.slice(0, 3);
                    number = value.slice(3);
                    break;

                case 11: // +CPPP####### -> CCC (PP) ###-####
                    country = value[0];
                    city = value.slice(1, 4);
                    number = value.slice(4);
                    break;

                case 12: // +CCCPP####### -> CCC (PP) ###-####
                    country = value.slice(0, 3);
                    city = value.slice(3, 5);
                    number = value.slice(5);
                    break;

                default:
                    return tel;
            }

            if (country == 1) {
                country = "";
            }

            number = number.slice(0, 3) + '-' + number.slice(3);

            return (country + " (" + city + ") " + number).trim();
        };
    });
