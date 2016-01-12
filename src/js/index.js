import angular from 'angular';
import ngRoute from 'angular-route';
import translate from 'angular-translate';
import translateLoaderStaticFiles from 'angular-translate-loader-static-files';
import ngMaterial from 'angular-material';
import WineCardsMain from './main';
import MasterController from './MasterController.js'

module.exports = (function () {
    'use strict';
    return angular.module('WineCards', ['ngMaterial', 'pascalprecht.translate', 'ngRoute', 'ngAnimate', 'WineCards.Main'])
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
        .run(['$translate', function ($translate) {
            $translate.use('itIT');
    }])
        .name;
}());