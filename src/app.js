import angular from 'angular';
import WineCards from './js';

//CSS requires
require('angular-material/angular-material.min.css');
require('animate.css/animate.min.css');
require('./static/css/winecards.css');

var app = {};
app.cordova = {
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
    angular.bootstrap(document, [WineCards]);
  }

};

//Init Cordova App
app.cordova.initialize();
