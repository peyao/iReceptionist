/**
 * @ngdoc factory
 * @name iReceptionistApp.BusinessService
 * @description
 * # BusinessService
 * Service in the iReceptionistApp.
 */
angular.module('iReceptionistApp')
.factory('BusinessService', function($http) {
    var API_URL = 'http://52.86.89.63:3000';

    return {
        getBusinessSubdomain(busId, token, success, error) {
            this.getBusiness(
                busId,
                token,
                function(busObj) {
                    console.log(busObj);
                    var subdomain = busObj.name.toLowerCase().replace(/[^a-zA-Z0-9]/g,"");
                    return success(subdomain);
                },
                error
            );
        },
        getBusiness: function(busId, token, success, error) {
            var req = {
                method: 'GET',
                url: '/business',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params:{
                    businessId: busId,
                },
            };
            this.apiCall(req, success, error);
        },
        updateBusiness: function(busObj, token, success, error){
            var req = {
                method: 'PUT',
                url: '/business',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                data: busObj,
            };
            this.apiCall(req, success, error);
        },
        suspendBusiness: function(busId, isSuspend, token, success, error){
            var req = {
                method: 'DELETE',
                url: '/business',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json;charset=utf-8'
                },
                data: {
                    'businessId': busId,
                    'suspended': isSuspend,
                },
            };
            this.apiCall(req, success, error);
        },
        getBusinessList: function(token, success, error){
            var req = {
                method: 'GET',
                url: '/business/list',
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
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
