import angular from 'angular';
import prefService from './prefService';
import translate from 'angular-translate';


/**
 * Module for the user settings preferences of the app.
 */
module.exports = (function () {
    'use strict';
    return angular.module('WineCards.Preferences', ['pascalprecht.translate'])
    .service('prefService', prefService)
    .name;
}());
