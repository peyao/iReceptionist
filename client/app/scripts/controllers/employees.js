/**
 * @ngdoc function
 * @name iReceptionistApp.controller:EmployeeCtrl
 * @description
 * # EmployeeCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
  .controller('EmployeesCtrl', function($rootScope, $scope, $cookies, UserService) {
      $rootScope.currentState = 'employees';
      $('#page-content-ui-view').resize(function () {
          $('#page-content-ui-view').width($rootScope.pageContentWidth());
          $('#page-content').height($rootScope.pageContentHeight());
      });
      $scope.showEmployeesMore = false;
      $scope.employees = [];
      $scope.emp = '';

    $scope.cancel = function() {
      console.log('resetting form')
      $scope.editEmp = {};
      $scope.editEmp.email = '';
      $scope.editForm.$setPristine();
      $scope.newEmp = {};
      $scope.newEmp.email = '';
      $scope.inviteForm.$setPristine();
    };
      var getEmployeeList = function () {
          UserService.getEmployees(
              $cookies.get('token'),
              function (empObj) {
                  $scope.employees = empObj;
                  console.log("Grabbing them employees: " + empObj.name);
              },
              function (err) {
                  //$scope.alert.danger = err.errorMsg;
              }
          );
      };

      $scope.cancel = function() {
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

      getEmployeeList();
      $scope.inviteEmployee = function () {
          if ($scope.emp.name && $scope.emp.email && $scope.emp.number) {
              $scope.employees.push({
                  "name": $scope.emp.name,
                  "email": $scope.emp.email,
                  "phone": $scope.emp.phone
              });
          }
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
