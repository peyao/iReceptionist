/**
 * @ngdoc factory
 * @name iReceptionistApp.AuthenticationService
 * @description
 * # AuthenticationService
 * Service in the iReceptionistApp.
 */
angular.module('iReceptionistApp')
.factory('AuthenticationService', function(config, $http) {
    var API_URL = 'http://52.86.89.63:3000';

    // apiDocs: https://cse112.siriolabs.com/doc/#api-User
    return {
        // User - Create new Manager and Business
        register: function(regObj, success, error) {
            var req = {
                method: 'POST',
                url: '/user/signUp',
                data: regObj,
            };
            this.apiCall(req, success, error);
        },
        // User - Signin User
        login: function(userObj, success, error) {
            var req = {
                method: 'POST',
                url: '/user/signIn',
                data: userObj,
            };
            this.apiCall(req, success, error);
        },
        // TODO: User - [INCOMPLETE] Create new employee user
        // API still does not have this implemented yet.
        inviteEmployee: function(userObj, success, error) {
            var req = {
                method: 'POST',
                url: '/user/signIn',
                data: userObj,
            };
            this.apiCall(req, success, error);
        },
        apiCall: function(req, success, error) {
            req.url = API_URL + req.url;
            $http(req)
            .success(function(data) {
                success(data);
            }).error(function(data, status) {
                error(data, status);
            });
        }
    };
});
