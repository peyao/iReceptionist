/**
 * Created by Amanda on 3/12/2016.
 */

angular.module('iReceptionistApp')
    .factory('NotificationService', function($http) {
        var API_URL = 'http://52.86.89.63:3000';

        return {
            sendEmail: function(to, subject, message, token, success, error){
                var req = {
                    method: 'POST',
                    url: '/notification/email',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                    data: {
                        "to": to,
                        "subject": subject,
                        "payload": message,
                    },
                };
                this.apiCall(req, success, error);
            },
            sendSMS: function(to, message, token, success, error){
                var req = {
                    method: 'POST',
                    url: '/notification/sms',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                    data: {
                        "to": to,
                        "payload": message,
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