(function() {
  var Scores = (function() {
    var score8 = {
        8: "EXCEL",
        7: "OPTIM",
        6: "GOOD",
        5: "SUFF",
        4: "INSUFF",
        2: "POOR",
        0: "NEGATIVE"
      },
      score7 = {
        7: "EXCEL",
        6: "OPTIM",
        5: "GOOD",
        4: "SUFF",
        3: "INSUFF",
        2: "POOR",
        0: "NEGATIVE"
      },
      score6 = {
        6: "EXCEL",
        5: "OPTIM",
        4: "GOOD",
        3: "SUFF",
        2: "INSUFF",
        1: "POOR",
        0: "NEGATIVE"
      };
    return function Scores(sparkling) {
      this.parameters = {};
      this.parameters.seeing = {};
      this.parameters.smell = {};
      this.parameters.taste = {};
      this.parameters.overall = {};
      if (sparkling === true) {
        //punteggi spumante
        this.parameters.seeing.clearness = score6;
        this.parameters.seeing.dimension = score6;
        this.parameters.seeing.persistence = score6;
        this.parameters.seeing.tonality = score6;
        this.parameters.seeing.intensity = score6;
        this.parameters.smell.frankness = score7;
        this.parameters.smell.intensity = score7;
        this.parameters.smell.finesse = score7;
        this.parameters.smell.armony = score7;
        this.parameters.taste.frankness = score7;
        this.parameters.taste.intensity = score7;
        this.parameters.taste.winebody = score7;
        this.parameters.taste.armony = score7;
        this.parameters.taste.persistence = score7;
        this.parameters.taste.aftertaste = score7;
        this.parameters.overall.total = score7;
      } else {
        //punteggi fermi
        this.parameters.seeing.clearness = score6;
        this.parameters.seeing.tonality = score6;
        this.parameters.seeing.intensity = score6;
        this.parameters.smell.frankness = score6;
        this.parameters.smell.intensity = score8;
        this.parameters.smell.finesse = score8;
        this.parameters.smell.armony = score8;
        this.parameters.taste.frankness = score6;
        this.parameters.taste.intensity = score8;
        this.parameters.taste.winebody = score8;
        this.parameters.taste.armony = score8;
        this.parameters.taste.persistence = score8;
        this.parameters.taste.aftertaste = score6;
        this.parameters.overall = score8;
      }
    };
  }());
  var WineTasteCard = (function() {
    return function WineTasteCard() {
      this.id = "";
      this.wine = "";
      this.date = new Date();
      this.parameters = {};
      this.parameters.seeing = {
        clearness: 0,
        tonality: 0,
        intensity: 0
      };
      this.parameters.smell = {
        frankness: 0,
        intensity: 0,
        finesse: 0,
        armony: 0
      };
      this.parameters.taste = {
        frankness: 0,
        intensity: 0,
        winebody: 0,
        armonu: 0,
        persistence: 0,
        aftertaste: 0
      };
      this.parameters.overall = {
        total: 0
      };
      this.sparkling = false;
      this.tot_score = 0;
    };
  }());
  var WineCardObject = (function() {
    return function WineCardObject(i_card) {
      //vars
      this.card = i_card || new WineTasteCard();
      this.scores = null;
      /**
       */
      this.setSparkling = function setSparkling(val) {
        if (typeof(val) === "undefined") {
          val = false;
        }
        if (this.card.sparkling === val) {
          return;
        }
        this.card.sparkling = val;
        if (val === false) {
          delete this.card.parameters.seeing.dimension;
          delete this.card.parameters.seeing.persistence;
        } else {
          this.card.parameters.seeing.dimension = 0;
          this.card.parameters.seeing.persistence = 0;
        }
        this.azzeraScheda();
      };
      this.getSparkling = function getSparkling() {
        return this.card.sparkling;
      };
      this.getScheda = function getScheda() {
        return this.card;
      };
      this.getScores = function getScores() {
        this.scores = new Scores(this.getSparkling());
        return this.scores;
      };
      this.saveCard = function saveCard() {};
      this.deleteCard = function deleteCard() {};
      this.clearCard = function clearCard() {
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
          for (j = 0; j < p2.length; j + 1) {
            val = p2[j];
            this.card.parameters[par][val] = 0;
          }
        }
      };
      this.tot_score = function tot_score() {
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
        return this.card.tot_score;
      };
      this.getParameters = function getParameters() {
        return keys(this.card.parameters);
      };
      this.getSectionAndScore = function getSectionAndScore(par){
        this.getScores();
        var ret = [];
        for( var val in this.card.parameters[par] ){
          var score = this.score[val];
          ret.push([val, score]);
        }
        return ret;
      };
    };
  }());
  /**
   * @ngdoc service
   * @memberof WineCardsTaste
   * @name WineCardsTaste:TasteService
   * @description
   * Service used to manage the save and load of wines taste cards in a IndexedDB
   */
  function TasteService($translate) {
    this.wine = null;
    this.edit = true;

    this.newWine = function newWine() {
      this.wine = new WineCardObject();
    };

    this.setEdit = function setEdit(val){
      this.edit = Boolean(val);
    };

    console.log("TasteService instantiated!");
    return this;
  }
  angular.module('WineCards.Taste')
    .service('TasteService', ['$translate', TasteService]);
})();
