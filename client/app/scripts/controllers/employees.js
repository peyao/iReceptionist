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
        $('#page-content-ui-view').resize(function () {
            $('#page-content-ui-view').width($rootScope.pageContentWidth());
            $('#page-content').height($rootScope.pageContentHeight());
        });
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
                    console.log("employee list error");
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
            UserService.addEmployee(
                $cookies.get('token'),
                {
                    "name": $scope.newEmp.name,
                    "phone": $scope.newEmp.phone,
                    "email": $scope.newEmp.email,
                },
                function (empObj) {
                    console.log("Added employee " + empObj.name);
                },
                function (err) {
                    console.log("Add employee error");
                }
            );
            $scope.newEmp = {};
        };

        $scope.saveEmp = function (e) {
            $scope.name = e.name;
            $scope.email = e.email;
            $scope.phone = e.phone;
            $scope.userID = e._id;
            $scope.editEmp.name = e.name;
            $scope.editEmp.email = e.email;
            $scope.editEmp.phone = e.phone;
            $scope.editEmp.userID = e._id;
            console.log("Curr Emp " + $scope.name);
            console.log("Curr ID " + $scope.userID)
        };

        $scope.editEmployee = function (emp) {
            UserService.updateUser(
                $cookies.get('token'),
                {
                    "name": $scope.editEmp.name,
                    "email": $scope.editEmp.email,
                    "phone": $scope.editEmp.phone
                },
                function (userObj) {
                    console.log("Update employee: " + userObj);
                    console.log("cookies token " + $cookies.get('token'));

                },
                function (err) {
                    console.log("Update employee error");
                }
            );
        };

        $scope.deleteUser = function () {
            console.log($scope.userID);
            UserService.deleteEmployee(
                $cookies.get('token'),
                $scope.userID,
                function (empObj) {
                    console.log("Deleted employee: " + empObj);
                },
                function (err) {
                    console.log("Delete employee error");
                    console.log("Curr ID " + $scope.userID);
                }
            );
        };


        //UserService.addEmployee(
        //    $cookies.get('token'),
        //    {
        //        "name": "required",
        //        "phone": "required",
        //        "email": "required",
        //        "avatar": "optional"
        //    },
        //    function (empObj) {
        //        console.log("Invited employee: " + empObj);
        //    },
        //    function (err) {
        //        console.log("Invite employee error");
        //    }
        //);
        //
        //UserService.deleteEmployee(
        //    $cookies.get('token'),
        //    'userIdToDelete',
        //    function (empObj) {
        //        console.log("Deleted employee: " + empObj);
        //    },
        //    function (err) {
        //        console.log("Delete employee error");
        //    }
        //);
        //
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

        /*  if(!$cookies.get('employees')){
         UserService.getEmployees(
         $cookies.get('token'),
         $cookies.getObject('user').employee,

         data.forEach(function(empObj) {
         console.log("Employee " + empObj);
         $scope.employees.push({
         "name": user.name,
         "email": user.email,
         "phone": user.phone,
         "avatar": user.avatar
         });
         },
         function (err){
         console.log(err);
         }
         );
         };*/


        /*  $scope.submit = function (form) {
         $http.post('/api/employee',
         {
         name: form.name,
         email: form.email,
         number: form.number
         })
         };*/

        /*  $scope.inviteEmployee = function() {
         if ($scope.emp.name && $scope.emp.email && $scope.emp.number) {
         $scope.employees.push({
         "name": $scope.emp.name,
         "email": $scope.emp.email,
         "phone": $scope.emp.phone
         });
         }
         };*/

        /*  $scope.submit = function (form) {
         $http.post('/api/employee',
         {
         name: form.name,
         email: form.email,
         number: form.number
         })
         };*/

        console.log('EmployeesCtrl loaded.');
    });
