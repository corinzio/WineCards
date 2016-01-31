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
  }
  getCard() {
    return angular.copy(this.card);
  }
  getScores() {
    this.scores = new Score(this.card.sparkling);
    return angular.copy(this.scores);
  }
  clearCardParameters() {
    for (let par in this.card.parameters) {
      for (let val in this.card.parameters[par]) {
        this.card.parameters[par][val] = 0;
      }
    }
  }
  getTotalPoints() {
    this.card.tot_score = 0;
    this.getScores();
    for (let par in this.card.parameters) {
      for (let val in this.card.parameters[par]) {
        this.card.tot_score = this.card.tot_score + this.scores.parameters[par][val][this.card.parameters[par][val]][0];
      }
    }
    return angular.copy(this.card.tot_score);
  }
  getParameters() {
    return angular.copy(Object.keys(this.card.parameters));
  }
  getName() {
    return angular.copy(this.card.wine_name);
  }
  setName(wine_name) {
    this.card.wine_name = wine_name;
  }
  getWineYear() {
    return angular.copy(this.card.wine_year);
  }
  setWineYear(year) {
    this.card.wine_year = year;
  }
  getSparkling() {
    return angular.copy(this.card.sparkling);
  }
  setSparkling(val) {
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
  }
  getValues() {
    return angular.copy(this.card.parameters);
  }
  saveValues(val) {
    this.card.parameters = angular.copy(val);
  }
  setNote(note) {
    this.card.wine_notes = angular.copy(note);
  }
  getNote(note) {
    return angular.copy(this.card.wine_notes);
  }
  getPhoto() {
    return angular.copy(this.card.photo);
  }
  setPhoto(data) {
    this.card.photo = data;
  }
  getCommercialName() {
    return angular.copy(this.card.commercial_name);
  }
  setCommercialName(name) {
    this.card.commercial_name = name;
  }
  getProducer() {
    return angular.copy(this.card.producer);
  }
  setProducer(prod) {
    this.card.producer = prod;
  }
}
