/**SettingsController.js**/
(function() {
  function SettingsController($window, $scope, $mdToast, $translate, ConfigService) {
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
