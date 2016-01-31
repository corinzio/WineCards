import angular from 'angular';
import PushService from './PushService.js';
import OneSignalKey from './onesignalkey.js';

module.exports = (function() {
  'use strict';
  return angular.module('WineCards.Push', ['ngRoute'])
    .service('PushService', PushService)
    //init push service
    .run(['$window', 'PushService', function($window, pushsrv) {
      console.log("init push service");
      var oneSigKey = new OneSignalKey();
      $window.plugins.OneSignal.init(oneSigKey.onesignalapp, {
        googleProjectNumber: oneSigKey.google_prj
      }, pushsrv.notificationOpened.bind(pushsrv)); //callback method needs to be executed on object context
    }])
    .name;
}());
