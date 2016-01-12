/** prefService.js **/
import translate from 'angular-translate';
import angular from 'angular';


/*
 * Application preferences for the app.
 * Store the informations in LocalStorage.
 */
export default class prefService{
    constructor($window, $translate){
        /**
         * @property {String} LSPREFS constant identifier for the LocalStorage of 
         */
        const LSPREFS = "WineCardsPreferences";

    
    /*
     * @propertye {array} list of supported languages
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
    }
}

prefService.$inject = ['$window', '$translate'];