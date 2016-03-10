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
      //    {
      //        "name": "required",
      //        "phone": "required",
      //        "email": "required",
      //        "avatar": "optional"
      //    },
      //    $cookies.get('token'),
      //    function (empObj) {
      //        console.log("Invited employee: " + empObj);
      //    },
      //    function (err) {
      //        console.log("Invite employee error");
      //    }
      //);
      //
      //UserService.deleteEmployee(
      //    'userIdToDelete',
      //    $cookies.get('token'),
      //    function (empObj) {
      //        console.log("Deleted employee: " + empObj);
      //    },
      //    function (err) {
      //        console.log("Delete employee error");
      //    }
      //);
      //
      //UserService.updateUser(
      //    {
      //        "field": "value",
      //        "field": "value"
      //    },
      //    $cookies.get('token'),
      //    function (userObj) {
      //        console.log("Update employee: " + userObj);
      //    },
      //    function (err) {
      //        console.log("Update employee error");
      //    }
      //);

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
