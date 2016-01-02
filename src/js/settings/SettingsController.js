angular.module('WineCards.Settings').controller('SettingsController', ['$scope','ConfigService', function($scope, ConfigService) {
    $scope.prefs = {};
    $scope.prefs.curlang = ConfigService.getLanguage();

    $scope.getLanguages = function getLanguages(){
      return ConfigService.getAvailableLanguages();
    };
    $scope.setLanguage = function setLanguage(){
      ConfigService.setLanguage($scope.prefs.curlang);
    };

    $scope.saveSettings = function saveSettings(prefs){
      console.log('saveSettings' + JSON.stringify(prefs));
      ConfigService.savePreferences();
    };
    console.log('SettingsController init');
}]);
