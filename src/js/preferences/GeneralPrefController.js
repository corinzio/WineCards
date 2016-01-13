/**GeneralPrefController.js**/
import angular from 'angular';
import translate from 'angular-translate';
import ngMaterial from 'angular-material';
import prefService from './prefService';


export default class GeneralPrefController{
    constructor($window, $scope, $mdToast, $translate, prefService){
        /**
        * @property {Object} App preferences copy;
        */
        this.prefs =  prefService.getPreferences();
        
    }
};

/**
(function() {
  function SettingsController($window, $scope, $mdToast, $translate, prefService) {
    $scope.prefs = {};
    $scope.prefs.curlang = ConfigService.getLanguage();
    $scope.getLanguages = function getLanguages() {
      return ConfigService.getAvailableLanguages();
    };
    $scope.setLanguage = function setLanguage() {
      ConfigService.setLanguage($scope.prefs.curlang);
    };
    $scope.saveSettings = function saveSettings(prefs) {
      var ok;
      var msg;
      console.log('saveSettings' + JSON.stringify(prefs));
      ok = ConfigService.savePreferences();
      if (ok) {
        msg = $translate.instant("SUCCESS");
      } else {
        msg = $translate.instant("FAILURE");
      }
      $mdToast.show($mdToast.simple()
        .textContent(msg)
        .position("top left")
        .hideDelay(2000));
    };
    this.backBtn = function bakBtn(event, data) {
      console.log('receving backbtn');
      $window.history.back();
    };
    $scope.$on('BACKBTN', this.backBtn);
    console.log('SettingsController init');
  }
  angular.module('WineCards.Settings')
    .controller('SettingsController', ['$window', '$scope', '$mdToast', '$translate', 'ConfigService', SettingsController]);
})();
**/