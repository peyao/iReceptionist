/**
 * @ngdoc function
 * @name iReceptionistApp.controller:EmployeeCtrl
 * @description
 * # EmployeeCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
  .controller('EmployeesCtrl', function($rootScope, $scope) {
    $rootScope.currentState = 'employees';
    $('#page-content-ui-view').resize(function() {
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

    $scope.cancel = function() {
      console.log('resetting form')
      $scope.editEmp = {};
      $scope.editEmp.email = '';
      $scope.editForm.$setPristine();
      $scope.newEmp = {};
      $scope.newEmp.email = '';
      $scope.inviteForm.$setPristine();
    };

    $scope.newEmp = {};
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
