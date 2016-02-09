import angular from 'angular';
import ngRoute from 'angular-route';
import translate from 'angular-translate';
import translateLoaderStaticFiles from 'angular-translate-loader-static-files';
import ngMaterial from 'angular-material';
import WineCardsMain from './main';
import MasterController from './MasterController.js';
import WineCardsPreferences from './preferences';
import comp from './components';
import WineCardsTaste from './taste';
import WineCardsPush from './onesignal';
import WineCardsDb from './database';
import WineCardsLogin from './login';

module.exports = (function() {
  'use strict';
  /**
   * Main module of the WineCards angular application
   */
  return angular.module('WineCards', ['ngMaterial', 'pascalprecht.translate', 'ngRoute', 'ngAnimate', WineCardsMain, WineCardsPreferences, WineCardsTaste, WineCardsPush, WineCardsDb, WineCardsLogin])
    .controller('MasterController', MasterController)
    //Configure i18n
    .config(['$translateProvider', function($translateProvider) {
      $translateProvider.useStaticFilesLoader({
        prefix: 'static/lang/',
        suffix: '.json'
      });
    }])
    //Default Routing
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
      $routeProvider.otherwise({
        redirectTo: '/main'
      });
    }])
    //init translation language
    .run(['$translate', 'PrefService', function($translate, PrefService) {
      console.log("load prefs");
      //load users preferences
      PrefService.loadPreferences();
      $translate.use(PrefService.getLanguage());
    }])
    //init keyboard plugin
    .run(['$window',function($window) {
      $window.addEventListener('native.keyboardhide', function() {
        $window.document.activeElement.blur();
      });
    }])
    //add components
    .directive('starRating', comp.rating)
    .name;
}());
