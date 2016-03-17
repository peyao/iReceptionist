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

    $scope.showEmployeesMore = false;
    $scope.employees = [];
    $scope.emp = '';
    $scope.name = '';
    $scope.email = '';
    $scope.phone = '';
    $scope.editEmp = {};
    $scope.newEmp = {};

    if(($cookies.get('token')!= '-1') && ($scope.done != '0')) {
      $scope.currentStep = 0;
      $trace("currstep " + $scope.currentStep);
    }
    var getEmployeeList = function() {
      UserService.getEmployees(
        $cookies.get('token'),
        function(empObj) {
          $scope.employees = empObj;
          $trace("Grabbing employees");
        },
        function(err) {
          $trace("Employee list error");
        }
      );
    };

    getEmployeeList();

    $scope.cancel = function() {
      $trace('resetting form')
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


    $scope.addEmployee = function() {
      UserService.addEmployee({
          "name": $scope.newEmp.name,
          "phone": $scope.newEmp.phone,
          "email": $scope.newEmp.email,
        },
        $cookies.get('token'),
        function(empObj) {
          $trace("Added employee " + empObj.name);
          //TODO: PUSHER
          getEmployeeList();
        },
        function(err) {
          $trace("Add employee error");
        }
      );
      $scope.newEmp = {};
      $('#inviteEmp').modal('hide');

    };

    $scope.saveEmp = function(e) {
      $scope.name = e.name;
      $scope.email = e.email;
      $scope.phone = e.phone;
      $scope.userID = e._id;
      $scope.role = e.role;
      $scope.editEmp.name = e.name;
      $scope.editEmp.email = e.email;
      $scope.editEmp.phone = e.phone;
      $scope.editEmp.userID = e._id;
    };

    $scope.editEmployee = function(emp) {
      UserService.updateEmployee({
          "name": $scope.editEmp.name,
          "email": $scope.editEmp.email,
          "phone": $scope.editEmp.phone,
          "userId": $scope.userID,
        },
        $cookies.get('token'),
        function(userObj) {
          getEmployeeList();
          $trace("Update employee: " + userObj);
        },
        function(err) {
          $trace("Update employee error");
        }
      );
      $('#editEmp').modal('hide');

    };
    $scope.changeRole = function() {

      UserService.changeRole(
        $scope.userID,
        $scope.editEmp.role,
        $cookies.get('token'),
        function(userID, role) {
          $trace("Promoted user to " + $scope.editEmp.role);
        },
        function(err) {
          $trace("Change Role error");
        }
      );
    };
    $scope.deleteUser = function() {
      UserService.deleteEmployee(
        $scope.userID,
        $cookies.get('token'),
        function(empObj) {
          $trace("Deleted employee: " + empObj);
          //TODO: PUSHER
          getEmployeeList();

        },
        function(err) {
          $trace("Delete employee error");
        }
      );
    };
    $trace('EmployeesCtrl loaded.');
  })
  .filter('tel', function() {
    return function(tel) {
      if (!tel) {
        return '';
      }

      var value = tel.toString().trim().replace(/^\+/, '');

      if (value.match(/[^0-9]/)) {
        return tel;
      }

      var city, number;

          city = value.slice(0, 3);
          number = value.slice(3);

      number = number.slice(0, 3) + '-' + number.slice(3);

      return (" (" + city + ") " + number).trim();
    };
  });
