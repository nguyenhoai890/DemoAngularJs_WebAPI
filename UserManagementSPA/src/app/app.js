import angular from 'angular';
import uiRouter from 'angular-ui-router';

import home from './components/home/home';
import users from './components/users/user';
import AppService from './AppService.js';
import appConfig from './config.js'

import 'jquery/dist/jquery.min.js';
import 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';


import '../style/app.css';
import template from './app.html';

export class AppCtrl {
  constructor($log,$scope) {
  }
}

AppCtrl.$inject = ['$log','$scope'];

export const appDirective = {
    template: template,
    controller: AppCtrl,
};

const MODULE_NAME = 'app';



angular
.module(MODULE_NAME, [
  home,
  users
])
.service('AppService',AppService)
.component('app', appDirective)
.run(function run($rootScope) {
  $rootScope.WebServiceUrl = appConfig.web_api_url;
  $rootScope.UserAPI = appConfig.restful_user_api;
});;

export default MODULE_NAME;
