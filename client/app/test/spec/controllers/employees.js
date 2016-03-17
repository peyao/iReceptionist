describe('Controller: EmployeesCtrl', function() {

    // load the controller's module
    beforeEach(module('iReceptionistApp'));

    var EmployeesCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        EmployeesCtrl = $controller('EmployeesCtrl', {
            $scope: scope
                // place here mocked dependencies
        });
    }));

    it('should attach a list of awesomeThings to the scope', function() {
        expect(EmployeesCtrl.awesomeThings.length).toBe(3);
    });
});
