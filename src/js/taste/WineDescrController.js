/** WineDescrController.js **/
//import angular from 'angular'
//import translate from 'angular-translate';
//import WineCardService from './WineCardService.js';

export default class WineDescrController {
    constructor(WineCardService,$translate,$window,$scope,$location) {
        this.wine_name = WineCardService.getWineName();
        this.wine_year = WineCardService.getWineYear();
        this.wine_sparkling = WineCardService.getSparkling();

        this.setWineDescription = function setWineDescription(){
            WineCardService.setSparkling(this.wine_sparkling);
            WineCardService.setWineName(this.wine_name);
            WineCardService.setWineYear(this.wine_year);
            this.gotoNextPage();
        };
        /**
         * @method backBtn
         * @description performs the back navigation
         */
        this.backBtn = function bakBtn(event, data) {
          $location.path('/')
            .replace();
        };
        this.gotoNextPage = function gotoNextPage(){
          $location.path('/wine/new/score');
        };
        /**
         * @signal listen to the BACKBTN signal from MasterController to perform the back navigation
         */
        $scope.$on('BACKBTN', this.backBtn);

        console.log('WineDescrController init');
    }
}

WineDescrController.$inject = ['WineCardService','$translate','$window','$scope','$location'];
