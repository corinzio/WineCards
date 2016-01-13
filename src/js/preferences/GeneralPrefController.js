/**GeneralPrefController.js**/
import angular from 'angular';
import translate from 'angular-translate';
import ngMaterial from 'angular-material';


export default class GeneralPrefController{
    constructor($window, $scope, $mdToast, $translate, prefService){
        /**
        * @property {Object} App preferences copy;
        */
        this.prefs = prefService.getPreferences();
        this.languages = prefService.getAvailableLanguages();
        /**
        * @method getLanguages
        * @return {Array} List of available languages for the application
        */
        this.getLanguages = function getLanguages() {
          return prefService.getAvailableLanguages();
        };

        /**
        * @method setLanguage
        * @description
        * Set the language for the application
        */
        this.setLanguage = function setLanguage(lang) {
          this.prefs.curlang = lang;
          console.log("setting language = " + this.prefs.curlang);
          prefService.setLanguage(this.prefs.curlang);
          this.languages = this.getLanguages();
        };

        /**
        * @method saveSettings
        * @description
        * This methods trigger the sotre of the preferences in permanent storage
        * calling the appropriate method in the underneath service.
        * Shows on ui a toast with the success or the failure of the operation requested
        */
        this.savePreferences = function savePreferences() {
          var ok;
          var msg;
          console.log('savePreferences' + JSON.stringify(this.prefs));
          ok = prefService.savePreferences();
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

        /**
         * @method backBtn
         * @description performs the back navigation
         */
        this.backBtn = function bakBtn(event, data) {
          console.log('receving backbtn');
          $window.history.back();
        };
        /**
         * @signal listen to the BACKBTN signal from MasterController to perform the back navigation
         */
        $scope.$on('BACKBTN', this.backBtn);

        console.log('GeneralPrefController init');
    }
}

GeneralPrefController.$inject = ['$window', '$scope', '$mdToast', '$translate', 'prefService'];
