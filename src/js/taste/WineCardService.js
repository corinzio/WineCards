/** WineCardService.js **/
import angular from 'angular';
import translate from 'angular-translate';
import WineCardMgr from './WineCardManager.js';
export default class WineCardService {
  constructor() {
    this.wine = null;
    this.edit = true;
    console.log("WineCardService Instantiated");
  }
  newWine() {
    this.wine = new WineCardMgr();
  }
  setEdit(edt) {
    this.edit = edt;
  }
  getWineName() {
    return this.wine.getName();
  }
  setWineName(name) {
    this.wine.setName(name);
  }
  getWineYear() {
    return this.wine.getWineYear();
  }
  setWineYear(year) {
    this.wine.setWineYear(year);
  }
  getSparkling() {
    return this.wine.getSparkling();
  }
  setSparkling(spark) {
    this.wine.setSparkling(spark);
  }
  getParameters() {
    return this.wine.getParameters();
  }
  getScores() {
    return this.wine.getScores();
  }
  getValues() {
    return this.wine.getValues();
  }
  resetValues() {
    this.wine.clearCardParameters();
    return this.getValues();
  }
  saveValues(val) {
    this.wine.saveValues(val);
  }
  getTotalPoints() {
    return this.wine.getTotalPoints();
  }
  setNote(note) {
    return this.wine.setNote(note);
  }
  getNote() {
    return this.wine.getNote();
  }
  getPhoto(){
    return this.wine.getPhoto();
  }
  setPhoto(data){
    this.wine.setPhoto(data);
  }
  getCommercialName(){
    return this.wine.getCommercialName();
  }
  serCommercialName(name){
    this.wine.setCommercialName(name);
  }
  getProducer(){
    return this.wine.getProducer();
  }
  setProducer(prod){
    this.wine.setProducer(prod);
  }
}
