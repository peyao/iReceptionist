/**
 * Created by Amanda on 3/6/2016.
 */
angular.module('iReceptionistApp')
    .factory('UserService', function ($http) {
        var API_URL = 'http://52.86.89.63:3000';

        // apiDocs: https://cse112.siriolabs.com/doc/#api-User
        return {
            // User - Get User
            getUserByToken: function (token, success, error) {
                var req = {
                    method: 'GET',
                    url: '/user',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                };
                this.apiCall(req, success, error);
            },
            /* UserOb should contain any field in User you wish to change */
            updateUser: function(userObj, token, success, error){
               var req = {
                   method: 'PUT',
                   url: '/user',
                   headers: {
                       'Authorization': 'Bearer ' + token
                   },
                   data: userObj,
                };
                this.apiCall(req, success, error);
            },
            // UserObj should contain
            // "oldpassword": "password1"
            // "newpassword": "password2"
            changePassword: function(userObj, token, success, error){
                var req = {
                    method: 'PUT',
                    url: '/user/password',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    data: userObj,
                };
                this.apiCall(req, success, error);
            },
            // visObj should contain name, email, phone (all required) and avatar (optional)
            addEmployee: function(userObj, token, success, error){
                var req = {
                    method: 'POST',
                    url: '/employee/signUp',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    data: userObj,
                };
                this.apiCall(req, success, error);
            },
            deleteEmployee: function(userId, token, success, error){
                var req = {
                    method: 'DELETE',
                    url: '/user',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    data: {
                        'deleteUserId': userId
                    },
                };
                this.apiCall(req, success, error);
            },
            getEmployees: function (token, success, error) {
                var req = {
                    method: 'GET',
                    url: '/employee/list',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                };
                this.apiCall(req, success, error);
            },
            // userObj should contain name, email, phone, and userId
            updateEmployee: function (userObj, token, success, error){
                var req = {
                    method: 'PUT',
                    url: '/employee/edit',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    data: userObj
                };
                this.apiCall(req, success, error);
            },
            changeRole: function (userId, role, token, success, error){
                var req = {
                    method: 'PUT',
                    url: '/employee/changeRole',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    data: {
                        'userId': userId,
                        'role': role,
                    }
                };
                this.apiCall(req, success, error);
            },
            addStaff: function (name, phone, email, token, success, error){
                var req = {
                    method: 'POST',
                    url: '/vip/signUp',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    data: {
                        "name": name,
                        "phone": phone,
                        "email": email
                    }
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
