/**
 * @ngdoc factory
 * @name iReceptionistApp.BusinessService
 * @description
 * # BusinessService
 * Service in the iReceptionistApp.
 */
angular.module('iReceptionistApp')
.factory('BusinessService', function(config, $http) {

    return {
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
