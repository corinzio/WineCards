import angular from 'angular';
import ngRoute from 'angular-route';
import translate from 'angular-translate';
import translateLoaderStaticFiles from 'angular-translate-loader-static-files';
import ngMaterial from 'angular-material';
import WineCardsMain from './main';
import MasterController from './MasterController.js';
import WineCardsPreferences from './preferences';
import comp from './components';

module.exports = (function () {
    'use strict';
    /**
     * Main module of the WineCards angular application
     */
    return angular.module('WineCards', ['ngMaterial', 'pascalprecht.translate', 'ngRoute', 'ngAnimate', WineCardsMain, WineCardsPreferences])
        .controller('MasterController', MasterController)
        //Configure i18n
        .config(['$translateProvider', function ($translateProvider, $translate) {
            $translateProvider.useStaticFilesLoader({
                prefix: 'static/lang/',
                suffix: '.json'
            });

  }])
        //Default Routing
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $routeProvider.otherwise({
                redirectTo: '/main'
            });
  }])
        //init translation language
        .run(['$translate', 'prefService', function ($translate, prefService) {
            console.log("load prefs");
            //load users preferences
            prefService.loadPreferences();
            $translate.use(prefService.getLanguage());
    }])
        //add components
        .directive('starRating', comp.rating)
        .name;
}());