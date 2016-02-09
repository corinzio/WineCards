import ngRoute from 'angular-route';

export default function loginroutes ($routeProvider) {
  'use strict';
  $routeProvider.when('/login', {
    template: require('./login.html'),
    controller: 'LoginController',
    controllerAs: 'loginCtrl'
  });
}

 loginroutes.$inject = ['$routeProvider'];
