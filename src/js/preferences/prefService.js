/** prefService.js **/
import translate from 'angular-translate';
import angular from 'angular';
/*
 * Application preferences for the app.
 * Store the informations in LocalStorage.
 */
export default class prefService {
  constructor($window, $translate) {
    /**
     * @property {String} LSPREFS constant identifier for the LocalStorage of
     */
    const LSPREFS = "WineCardsPreferences";
    /**
     * @property {array} languages list of supported languages
     */
    this.languages = ["itIT", "enUS"];
    /**
     * @property {Object} preferences Object were is stored the user configuration
     */
    this.preferences = {};
    /**
     * @property {String} curlang currently selected language
     */
    this.preferences.curlang = "";
    /**
     * @method getAvailableLanguages
     * @return {array} list of supported languages (read-only use)
     */
    this.getAvailableLanguages = function getAvailableLanguages() {
      return this.languages;
    };
    /**
     * @method setLanguage
     * Set the language for the application and sort the language list
     * by the description of the language and not by the country code
     */
    this.setLanguage = function setLanguage(lang) {
      this.preferences.curlang = lang;
      $translate.use(this.preferences.curlang);
      console.log("Sorting languages");
      this.languages.sort(function(a, b) {
        var atransl = $translate.instant(a);
        var btransl = $translate.instant(b);
        return atransl.localeCompare(btransl);
      });
    };
    /**
     * @method getLanguage
     * @return {String} current language
     */
    this.getLanguage = function getLanguage() {
      return this.preferences.curlang;
    };
    /**
     * @method savePreferences
     * @description Stores the configuration in LocalStorage
     * @return {Boolean} true on success
     */
    this.savePreferences = function savePreferences() {
      try {
        $window.localStorage.setItem(LSPREFS, JSON.stringify(this.preferences));
      } catch (err) {
        return false;
      }
      return true;
    };
    /**
     * @method loadPreferences
     * @description
     * Load the configuration from LocalStorage
     * In case of error save the default preferences
     */
    this.loadPreferences = function loadPreferences() {
      var prefs = null;
      prefs = JSON.parse($window.localStorage.getItem(LSPREFS));
      if (prefs === null) {
        this.setDefaultPreferences();
        this.savePreferences();
      } else {
        //check preferences
        if (this.checkPreferences(prefs)) {
          this.preferences = prefs;
        } else {
          this.setDefaultPreferences();
          this.savePreferences();
        }
      }
      this.setLanguage(this.getLanguage());
    };
    /**
     * @method checkPreferences
     * @param pref {Object} configuration object
     * @return {Boolean} true if is a valid configuration object
     * @description
     * Sets default values for all configuration options
     */
    this.checkPreferences = function checkPreferences(pref) {
      //check presence of all needed attributes
      var attributes = Object.keys(this.preferences);
      for (var i in attributes) {
        if (typeof(pref[attributes[i]]) === 'undefined') {
          console.log("Preferences Error");
          return false;
        }
      }
      //verify value consistency
      if (this.languages.indexOf(pref.curlang) === -1) {
        return false;
      }
      //all check passed
      return true;
    };
    /**
     * @method setDefaultPreferences
     * @description
     * Sets default values for all configuration options
     */
    this.setDefaultPreferences = function setDefaultPreferences() {
      this.setLanguage('enUS');
    };
    /**
      * @method getPreferences
      * @return {Object} copy of preferences object
      */
    this.getPreferences(){
        angular.copy(this.preferences);
    };
    console.log("Instantiated ConfigService");
  }
}
prefService.$inject = ['$window', '$translate'];
