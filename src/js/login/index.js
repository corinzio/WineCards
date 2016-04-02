import angular from 'angular';
import LoginService from './LoginService.js';
import loginroutes from './routing.js';
import LoginController from './LoginController.js';


module.exports = (function() {
  'use strict';
  return angular.module('WineCards.Login', [])
    .service('LoginService', LoginService)
    .controller('LoginController', LoginController)
    .config(loginroutes)
    //init login service
    .run(['LoginService',function(LoginService){
      console.log("init login service");
    }])
    .name;
}());
