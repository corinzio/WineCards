/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var WineCards = {};
WineCards.cordova = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    console.log("Device Ready called");
    console.log("Bootstrap angular");
    angular.bootstrap(document, ['WineCards']);
  }
};
angular.module('WineCards', ['WineCards.Config', 'WineCards.Settings', 'WineCards.Taste', 'WineCards.Common', 'ngMaterial', 'pascalprecht.translate', 'ngRoute', 'ngAnimate']);
//Configure i18n
angular.module('WineCards')
  .config(function($translateProvider) {
    $translateProvider.useStaticFilesLoader({
      prefix: 'lang/',
      suffix: '.json'
    });
  });
//Default Routing
angular.module('WineCards')
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
      redirectTo: '/main'
    });
  });
//Configure Theme
angular.module('WineCards')
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('cyan');
  });
//Initialization method
angular.module('WineCards')
  .run(function($translate, ConfigService) {
    console.log("load prefs");
    //load users preferences
    ConfigService.loadPreferences();
    $translate.use(ConfigService.getLanguage());
  })
  .run(function(TasteService) {
    TasteService.initDb();
  })
  .run(function($window) {
    $window.addEventListener('native.keyboardhide', function() {
      $window.document.activeElement.blur();
    });
  });
//Init Cordova App
WineCards.cordova.initialize();
