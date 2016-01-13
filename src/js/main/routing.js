import ngRoute from 'angular-route';

export default function mainroutes ($routeProvider) {
  'use strict';
  $routeProvider.when('/main', {
    template: require('./main.html'),
    controller: 'MainController',
    controllerAs: 'mainCtrl'
  });
}

mainroutes.$inject = ['$routeProvider'];
