/** WineCardService.js **/
import angular from 'angular';
import translate from 'angular-translate';
import WineCardMgr from './WineCardManager.js';


export default class WineCardService{
    constructor($window, $translate){
        this.wine = null;
        this.edit = true;

        this.newWine = function newWine(){
            this.wine = new WineCardMgr();
        };

        this.setEdit = function setEdit(edt){
            this.edit = edt;
        };
        this.getWineName = function getWineName(){
            return this.wine.getName();
        };
        this.setWineName = function setWineName(name){
            this.wine.setName(name);
        };
        this.getWineYear = function getWineYear(){
            return this.wine.getWineYear();
        };
        this.setWineYear = function setWineYear(year){
            this.wine.setWineYear(year);
        };
        this.getSparkling = function getSparkling(){
            return this.wine.getSparkling();
        };
        this.setSparkling = function setSparkling(spark){
            this.wine.setSparkling(spark);
        };
        this.getParameters = function getParameters(){
            return this.wine.getParameters();
        };
        this.getScores = function getScores(){
          return this.wine.getScores();
        };
        this.getValues = function getValues(){
          return this.wine.getValues();
        };
        console.log("WineCardService Instantiated");
    }
}
WineCardService.$inject = ['$window', '$translate'];
