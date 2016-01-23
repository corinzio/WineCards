import Score from "./WineScore.js";
import Card from "./WineCard.js";
import angular from "angular";
export default class WineCardManager {
  constructor(in_card) {
    if (typeof(in_card) === 'undefined') {
      this.card = new Card();
      this.card.date = new Date()
        .valueOf();
    } else {
      this.card = in_card;
    }
    this.scores = null;
    this.getCard = function getCard() {
      return angular.copy(this.card);
    };
    this.getScores = function getScores() {
      this.scores = new Score(this.card.sparkling);
      return angular.copy(this.scores);
    };
    this.clearCardParameters = function clearCardParameters() {
      for (let par in this.card.parameters) {
        for (let val in this.card.parameters[par]) {
          this.card.parameters[par][val] = 0;
        }
      }
    };
    this.getTotalPoints = function getTotalPoints() {
      this.card.tot_score = 0;
      this.getScores();
      for (let par in this.card.parameters) {
        for (let val in this.card.parameters[par]) {
          this.card.tot_score = this.card.tot_score + this.scores.parameters[par][val][this.card.parameters[par][val]][0];
        }
      }
      return angular.copy(this.card.tot_score);
    };
    this.getParameters = function getParameters() {
      return angular.copy(Object.keys(this.card.parameters));
    };
    this.getName = function getName() {
      return angular.copy(this.card.wine_name);
    };
    this.setName = function setName(wine_name) {
      this.card.wine_name = wine_name;
    };
    this.getWineYear = function getWineYear() {
      return angular.copy(this.card.wine_year);
    };
    this.setWineYear = function setWineYear(year) {
      this.card.wine_year = year;
    };
    this.getSparkling = function getSparkling() {
      return angular.copy(this.card.sparkling);
    };
    this.setSparkling = function setSparkling(val) {
      if (typeof(val) === "undefined") {
        val = false;
      }
      if (this.card.sparkling === val) {
        return;
      }
      var old = this.getCard();
      this.card = new Card(val);
      this.setName(old.wine_name);
      this.setWineYear(old.wine_year);
      this.clearCardParameters();
      this.getScores();
    };
    this.getValues = function getValues() {
      return angular.copy(this.card.parameters);
    };
    this.saveValues = function saveValues(val) {
      this.card.parameters = angular.copy(val);
    };
    this.setNote = function setNote(note){
      this.card.wine_notes = angular.copy(note);
    };
    this.getNote = function getNote(note){
      return angular.copy(this.card.wine_notes);
    };
  }
}
