import angular from 'angular';
import uiRouter from 'angular-ui-router';

import template_users from './users.html';
import template_adduser from './adduser.html';
import template_userdetail from './userdetail.html';


// let userCreate = {
//     template_user_create: template_users,
//     controller: userController
// };


class UserController {
    constructor($log, $scope, AppService) {
        //debugger;
        console.log($scope);
        this.title = 'Users';
        console.log($scope)
        $scope.$on('eventListUser', function (event, data) {
            $scope.title = "List Users";
            console.log(event);
            console.log(data);
            AppService.getAll('http://localhost:50420/api/user/').then(
                function (response) {
                    
                    $scope.users = response.data;
                    console.log($scope.users);
                }
            );
        });
        //Add User
        $scope.$on('eventAddUser', function (event, data) {
            $scope.title = "Add New User";
        
        });
        $scope.submitAddUserForm = function (isValid) {
            ResetMessage($scope);
            if (isValid && $scope.user !== undefined) {
                var user = $scope.user;
                AppService.put(user).then(
                    function (response) {
                        if (response.data !== undefined) {
                            ShowMessage($scope, 'Add new user successfully.')
                        }
                    }
                );
            }
        };
        //User Detail
        $scope.$on('eventUserDetail', function (event, data) {
            
            $scope.title = "User's Detail";
            var userId = data.id;
            AppService.getbyID(userId).then(
                function (response) {
                    $scope.user = response.data;
                }
            );
        });
        $scope.submitUpdateUserForm = function (isValid) {
            ResetMessage($scope);
            if (isValid && $scope.user !== undefined) {
                var user = $scope.user;
                AppService.post(user).then(
                    function (response) {
                        if (response.data !== undefined && response.data) {
                            ShowMessage($scope, 'Update user successfully.')
                        }
                    }
                );
            }
        };
        $scope.DeleteUser = function (id) {
            if (typeof id !== 'undefined') {
                AppService.delete(id).then(
                    function (response) {
                        if (response.data !== undefined) {
                            if (response.data) {
                                AppService.getAll().then(
                                    function (response) {
                                        $scope.users = response.data;
                                    }
                                );
                            }
                        }
                    }
                );
            }
        };
    };
  }
  
  function ResetMessage($scope) {
    $scope.haveMessage = false;
    $scope.formMessage = "";
    }
    function ShowMessage($scope, message) {
        $scope.haveMessage = true;
        $scope.formMessage = message;
    }

  UserController.$inject = ['$log','$scope','AppService'];
  
  const MODULE_NAME = 'users';

  let users_data = {
    template:template_users,
    controller: UserController
    };
    let adduser_data = {
        template:template_adduser,
        controller: UserController
    };
    let userdetail_data = {
        template:template_userdetail,
        controller: UserController
    };

  angular.module(MODULE_NAME, [uiRouter])
   .config(($stateProvider) => {
      $stateProvider
      .state('users', {
        url: '/users',
        template: '<users></users>',
        onEnter: function ($rootScope, $timeout, $stateParams) {
            $timeout(function () {
                $rootScope.$broadcast('eventListUser', $stateParams);
            })
        }
      })
      .state('usersadd',
        {
            url: '/add',
            template: '<adduser></adduser>',
            onEnter: function ($rootScope, $timeout, $stateParams) {
                $timeout(function () {
                    $rootScope.$broadcast('eventAddUser', $stateParams);
                })
            }
        })
        .state('usersdetail', {
            url: "/users/:id",
            template: "<userdetail></userdetail>",
            onEnter: function ($rootScope, $timeout, $stateParams) {
                $timeout(function () {
                    $rootScope.$broadcast('eventUserDetail', $stateParams);
                })
            }
        })
      ;
    })
    .component('users', users_data)
    .component('adduser',adduser_data)
    .component('userdetail',userdetail_data)
    ;
  
    export default MODULE_NAME;
  