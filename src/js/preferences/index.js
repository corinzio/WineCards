import angular from 'angular';
import PrefService from './PrefService.js';
import translate from 'angular-translate';
import prefroutes from './routing.js';
import ngRoute from 'angular-route';
import GeneralPrefController from './GeneralPrefController.js';


/**
 * Module for the user settings preferences of the app.
 */
module.exports = (function () {
    'use strict';
    return angular.module('WineCards.Preferences', ['pascalprecht.translate', 'ngRoute'])
    .service('PrefService', PrefService)
    .controller('GeneralPrefController',GeneralPrefController)
    .config(prefroutes)
    .name;
}());
