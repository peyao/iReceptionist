/**
 * Created by Amanda on 3/6/2016.
 */
angular.module('iReceptionistApp')
    .factory('UserService', function($http) {
        var API_URL = 'http://52.86.89.63:3000';

        // apiDocs: https://cse112.siriolabs.com/doc/#api-User
        return {
            // User - Get User
            getUserByToken: function(token, success, error) {
                var req = {
                    method: 'GET',
                    url: '/user',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
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