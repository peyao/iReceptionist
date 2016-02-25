'use strict';

/**
 * @ngdoc factory
 * @name iReceptionistApp.AppointmentService
 * @description
 * # AppointmentService
 * Service in the iReceptionistApp.
 */
angular.module('iReceptionistApp')
.factory('AppointmentService', function(config, $http) {
    console.log('AppointmentService loaded.');

    return {
        getAppointment: function(success, error) {
            var req = {
                method: 'GET',
                url: '/appointment'
            };
            this.apiCall(req, success, error);
        },
        apiCall: function(req, success, error) {
            req.url = config.apiUrl + req.url;
            $http(req)
            .success(function(data) {
                success(data);
            }).error(function(data, status) {
                error(data, status);
            });
        }
    };
});
