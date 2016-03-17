angular.module('iReceptionistApp')
    .factory('AnalyticsService', function ($http) {
        var API_URL = 'http://52.86.89.63:3000';
    
        return {
            getAnalyticsUser: function (startDate, endDate, success, error) {
                var req = {
                    method: 'GET',
                    url: '/analytics/user',
                    params: {
                        date_from: startDate,
                        date_to: endDate,
                    },
                };
                this.apiCall(req, success, error);
            },
            getAnalyticsVisitor: function(token, startDate, endDate, success, error){
               var req = {
                   method: 'GET',
                   url: '/analytics/visitor',
                   headers: {
                       'Authorization': 'Bearer ' + token
                   },
                   params: {
                       date_from: startDate,
                       date_to: endDate,
                   },
                };
                this.apiCall(req, success, error);
            },
            apiCall: function (req, success, error) {
                req.url = API_URL + req.url;
                $http(req)
                    .success(function (data) {
                        success(data);
                    }).error(function (data, status) {
                    error(data, status);
                });
            }
        };
        
    });