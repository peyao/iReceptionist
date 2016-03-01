/**
 * @ngdoc factory
 * @name iReceptionistApp.AppointmentService
 * @description
 * # AppointmentService
 * Service in the iReceptionistApp.
 */
angular.module('iReceptionistApp')
.factory('VisitorService', function(config, $http) {
    var API_URL = 'http://52.86.89.63:3000';

    return {
        /*
        getVisitorQueue: function(success, error) {
            var req = {
                method: 'GET',
                url: '/visitor/queue'
            };
            this.apiCall(req, success, error);
        },
        */
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
