import angular from 'angular';
import MainController from './MainController.js';
import mainroutes from './routing.js';
import ngRoute from 'angular-route';

/**
 * Module for the main page of the application
 */
module.exports = (function(){
    'use strict';
    return angular.module('WineCards.Main',[ngRoute])
    .config(mainroutes)
    .controller('MainController',MainController).name;
}());
