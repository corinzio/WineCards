/**ConfigService.js**/
(function() {
  /**
   * @ngdoc service
   * @memberof WineCardsConfig
   * @name WineCardsConfig:ConfigService
   * @param $window {service} service used to persist data in LocalStorage
   * @param $translate {service} service used to set the translation use in the WineCards app
   * @description
   * Configuration Service used to store user preferences about the WineCards app
   * such as language.
   */
  function ConfigService($window, $translate) {
    //Constant value for LocalStorage preferences key
    var LSPREFS = "WineCardsPreferences";
    /**
     * @memberof WineCardsConfig:ConfigService
     * @param languages
     * @type array
     * @description
     * Array of available languages for the app
     */
    this.languages = ["itIT", "enUS"];
    /**
     * @memberof WineCardsConfig:ConfigService
     * @param preferences
     * @type Object
     * @description
     * preferences Object stores user configuration
     */
    this.preferences = {};
    /**
     * @memberof WineCardsConfig:ConfigService
     * @param curlang
     * @type string
     * @description
     * Current language for the app.<br />
     * Selected from array languages
     */
    this.preferences.curlang = "";
    /**
     * @ngdoc method
     * @memberof WineCardsConfig:ConfigService
     * @name getAvailableLanguages
     * @return {array} list of languages that can be used
     * @description
     * Return the list of available languages for the app
     */
    this.getAvailableLanguages = function getAvailableLanguages() {
      return this.languages;
    };
    /**
     * @ngdoc method
     * @memberof WineCardsConfig:ConfigService
     * @name setLanguage
     * @param lang {string} language, should be one returned from the method getAvailableLanguages
     * @description
     * set the language for the app
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
     * @ngdoc method
     * @memberof WineCardsConfig:ConfigService
     * @name getLanguage
     * @return {string} current language
     * @description
     * Returns the current language
     */
    this.getLanguage = function getLanguage() {
      return this.preferences.curlang;
    };
    /**
     * @ngdoc method
     * @memberof WineCardsConfig:ConfigService
     * @name savePreferences
     * @description
     * Stores the configuration in LocalStorage
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
     * @ngdoc method
     * @memberof WineCardsConfig:ConfigService
     * @name loadPreferences
     * @description
     * Load the configuration from LocalStorage
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
     * @ngdoc method
     * @memberof WineCardsConfig:ConfigService
     * @name checkPreferences
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
     * @ngdoc method
     * @memberof WineCardsConfig:ConfigService
     * @name setDefaultPreferences
     * @description
     * Sets default values for all configuration options
     */
    this.setDefaultPreferences = function setDefaultPreferences() {
      this.setLanguage('enUS');
    };
    console.log("Instantiated ConfigService");
    return this;
  }
  angular.module('WineCards.Config')
    .service('ConfigService', ['$window', '$translate', ConfigService]);
})();
