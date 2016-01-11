import angular from 'angular';
import ngRoute from 'angular-route';
import translate from 'angular-translate';
import translateLoaderStaticFiles from 'angular-translate-loader-static-files';
import ngMaterial from 'angular-material';
import mainConfig from './mainConfig.js';

module.exports = (function(){
'use strict';
return angular.module('WineCards', ['ngMaterial', 'pascalprecht.translate', 'ngRoute', 'ngAnimate']).name();
}());
