/**
JSDOC
**/
angular.module('WineCards.Config').factory('ConfigService',['$window', '$translate', function($window, $translate) {
  var config = {};

  config.languages = ["itIT", "enUS"];

  config.curlang = "";

  config.getAvailableLanguages = function getAvailableLanguages() {
    return config.languages;
  };
  config.setLanguage = function setLanguage(lang) {
    config.curlang = lang;
    $translate.use(lang);
  };
  config.getLanguage = function getLanguage() {
    return config.curlang;
  };

  config.savePreferences = function savePreferences(){

  };

  config.loadPreferences = function loadPreferences(){

  };

  return config;
}]);
