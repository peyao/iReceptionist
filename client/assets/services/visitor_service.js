/**
 * @ngdoc factory
 * @name iReceptionistApp.AppointmentService
 * @description
 * # AppointmentService
 * Service in the iReceptionistApp.
 */
angular.module('iReceptionistApp')
.factory('VisitorService', function($http) {
    var API_URL = 'http://52.86.89.63:3000';

    return {
        checkin: function(visObj, token, success, error) {
            var req = {
                method: 'POST',
                url: '/visitor/new',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                data: visObj,
            };
            this.apiCall(req, success, error);
        },
        getVisitorQueue: function(page, per_page, token, success, error) {
            var req = {
                method: 'GET',
                url: '/visitor/queue',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params:{
                    page: page,
                    per_page: per_page,
                },
            };
            this.apiCall(req, success, error);
        },
        getVisited: function(page, per_page, visitDate, token, success, error) {
            var req = {
                method: 'GET',
                url: '/visitor/visited' ,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params: {
                    page: page,
                    per_page: per_page,
                    date: visitDate,
                },
            };
            this.apiCall(req, success, error);
        },
        checkOff: function(visId, token, success, error){
            var req = {
                method: 'PUT',
                url: '/visitor/' + visId,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
            };
            this.apiCall(req, success, error);
        },
        deleteVisitor: function(visId, token, success, error){
            var req = {
                method: 'DELETE',
                url: '/visitor/' + visId,
                headers: {
                    'Authorization': 'Bearer ' + token
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
        },
    };
});
