import angular from 'angular';
import uiRouter from 'angular-ui-router';

import './home.css';
import template from './home.html';

class HomeCtrl {
  constructor($log) {
    // $log.info('HomeCtrl instantiated');
    this.title = 'This is a home page.';
  }
}

HomeCtrl.$inject = ['$log'];

let home = {
    template: template,
    controller: HomeCtrl
};

const MODULE_NAME = 'home';

angular.module(MODULE_NAME, [uiRouter])
  .config(function($stateProvider, $urlRouterProvider) {
    // For initial application load from base url
    $urlRouterProvider.otherwise('/');
    // defines routing for this component
    $stateProvider.state('home', {
      url: '/',
      template: '<home></home>'
    });
  })
  .component('home', home);

export default MODULE_NAME;
