/**
 * @ngdoc factory
 * @name iReceptionistApp.SearchService
 * @description
 * # FormService
 * Service in the iReceptionistApp.
 */
angular.module('iReceptionistApp')
.factory('SearchService', function($http) {
    var API_URL = 'http://52.86.89.63:3000';

    return {
        searchEmployees: function(term, token, success, error) {
            var req = {
                method: 'GET',
                url: '/searchUser',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params: {
                    'term': term
                }
            };
            this.apiCall(req, success, error);
        },
        searchVisitors: function(term, token, success, error) {
            var req = {
                method: 'GET',
                url: '/searchVisitor',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params: {
                    'term': term
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
