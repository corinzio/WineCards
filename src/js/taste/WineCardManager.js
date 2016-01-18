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
      var i,
        j,
        par,
        p2,
        val,
        p1 = Object.keys(this.card.parameters);
      this.card.tot_score = 0;
      for (i = 0; i < p1.length; i++) {
        par = p1[i];
        p2 = Object.keys(this.card.parameters[par]);
        for (j = 0; j < p2.length; j++) {
          val = p2[j];
          this.card.parameters[par][val] = 0;
        }
      }
    };
    this.getTotalPoints = function getTotalPoints() {
      this.card.tot_score = 0;
      var p1 = Object.keys(this.card.parameters),
        p2,
        i,
        j,
        val,
        par;
      for (i = 0; i < p1.length; i++) {
        par = p1[i];
        p2 = Object.keys(this.card.parameters[par]);
        for (j = 0; j < p2.length; j++) {
          val = p2[j];
          this.card.tot_score = parseInt(this.card.tot_score, 10) + parseInt(this.card.parameters[par][val], 10);
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
  }
}
