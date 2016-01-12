import angular from 'angular';
import prefService from './prefService';
import translate from 'angular-translate';


/**
 * Module for the user settings preferences of the app.
 */
module.exports = (function () {
    return angular.module('WineCards.Preferences', ['pascalprecht.translate']).name;
}());