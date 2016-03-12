/**
 * @ngdoc factory
 * @name iReceptionistApp.FormService
 * @description
 * # FormService
 * Service in the iReceptionistApp.
 */
angular.module('iReceptionistApp')
.factory('FormService', function($http) {
    var API_URL = 'http://52.86.89.63:3000';

    return {
        // I don't know what description is for, but it's required so give it some garbage.
        createForm: function(busId, formObj, token, success, error){
            var req = {
                method: 'POST',
                url: '/form',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                data: {
                    'businessId': busId,
                    'description': 'Garbage',
                    'form': formObj
                }
            };
            this.apiCall(req, success, error);
        },
        deleteForm: function(formId, token, success, error){
            var req = {
                method: 'DELETE',
                url: '/form',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json;charset=utf-8'
                },
                data: {
                    'id': formId,
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
