describe("Unit: Test Controllers", function() {
    beforeEach(module('iReceptionistApp'));
    var $controller;
    beforeEach(inject(function(_$controller_) {
        // The injector unwraps the underscores (_) from around the
        // parameter names when matching.
        $controller = _$controller_;
    }));

    describe('DashboardCtrl', function() {
        it('should have an undefined user because we didnt log in and set a cookie', function() {
            var $scope = {};
            var controller = $controller('DashboardCtrl', { $scope: $scope });
            expect($scope.user).toEqual(undefined);
        });
        it('should have a null showActive', function() {
            var $scope = {};
            var controller = $controller('DashboardCtrl', { $scope: $scope });
            expect($scope.showActive).toEqual(null);
        });
        it('should have a false showMine', function() {
            var $scope = {};
            var controller = $controller('DashboardCtrl', { $scope: $scope });
            expect($scope.showMine).toEqual(false);
        });
    });

    describe('EmployeesCtrl', function() {
        it('should have an empty employees array because we havent grabbed the employee list', function() {
            var $scope = {};
            var controller = $controller('EmployeesCtrl', { $scope: $scope });

            expect($scope.employees.length).toEqual(0);
        });
    });
});
