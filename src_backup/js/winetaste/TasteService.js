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
        this.parameters.overall.total = score8;
      }
    };
  }());
  var WineTasteCard = (function() {
    return function WineTasteCard() {
      this.id = 0;
      this.wine_name = undefined;
      this.wine_year = undefined;
      this.date = undefined;
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
        armony: 0,
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
      if (typeof(i_card) === 'undefined') {
        this.card = new WineTasteCard();
        this.card.date = new Date()
          .valueOf();
      } else {
        this.card = i_card;
      }
      this.scores = null;
      this.getScheda = function getScheda() {
        return this.card;
      };
      this.getScores = function getScores() {
        this.scores = new Scores(this.getSparkling());
        return this.scores;
      };
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
          for (j = 0; j < p2.length; j++) {
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
        return Object.keys(this.card.parameters);
      };
      this.getAttributesAndScores = function getAttributesAndScores(par) {
        var ret = [];
        var score;
        for (var val in this.scores.parameters[par]) {
          //score = this.scores.parameters[par][val];
          score = angular.copy(this.scores.parameters[par][val]);
          ret.push([val, score]);
        }
        return ret;
      };
      this.getName = function getName() {
        return this.card.wine_name;
      };
      this.setName = function setName(wine_name) {
        this.card.wine_name = wine_name;
      };
      this.getWineYear = function getWineYear() {
        return this.card.wine_year;
      };
      this.setWineYear = function setWineYear(year) {
        this.card.wine_year = year;
      };
      this.getSparkling = function getSparkling() {
        return this.card.sparkling;
      };
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
          if (this.card.parameters.taste.aftertaste === undefined) {
            this.card.parameters.taste.aftertaste = 0;
          }
        } else {
          this.card.parameters.seeing.dimension = 0;
          this.card.parameters.seeing.persistence = 0;
          delete this.card.parameters.taste.aftertaste;
        }
        this.clearCard();
      };
    };
  }());
  //IndexedDB
  var CardsDb = (function() {
    return function CardsDB($window) {
//lexical closures
      var self = this;
      var indexedDB = $window.indexedDB || $window.webkitIndexedDB || $window.mozIndexedDB;
//parameters
      this.dbName = "WineCards";
      this.stores = {};
      this.stores.winetastecards = "winetastecards";
      this.winedb = null;

      this.addWine = function addWine(wine,ok,no){
        var copy = angular.copy(wine);
        if( copy.id === 0 ){ delete copy.id;}
        //add callback
        var req = this.winedb.transaction(this.stores.winetastecards,"readwrite").objectStore(this.stores.winetastecards).put(copy);
        req.onsuccess = ok;
        req.onerror = no;
      };
      this.init = function init() {
        var req = indexedDB.open('WineCards', 1);
        req.onerror = this.errorOpenDB;
        req.onsuccess = this.successOpenDB;
        req.onupgradeneeded = this.createWineTasteCardsDB;
      };

      this.errorOpenDB = function errorOpenDB(event){
          console.log("error opening database");
      };

      this.successOpenDB = function  successOpenDB(event){
        self.winedb = event.target.result;
        console.log("Database Open");
      };

      this.createWineTasteCardsDB = function createWineTasteCardsDB(event) {
        if (event.oldVersion === 0) {
          console.log("create new database");
          var db = event.target.result;
          var storeobj = db.createObjectStore(self.stores.winetastecards, {
            keyPath: "id",
            autoIncrement: true
          });
          storeobj.createIndex("wine_name", "wine_name", {
            unique: false
          });
          storeobj.createIndex("date", "date", {
            unique: false
          });
        } else {
          console.log("upgrade db");
        }
      };
      //auto call to init when creating the object
      this.init();
    };
  })();
  /**
   * @ngdoc service
   * @memberof WineCardsTaste
   * @name WineCardsTaste:TasteService
   * @description
   * Service used to manage the save and load of wines taste cards in a IndexedDB
   */
  function TasteService($window, $translate) {
    var self = this;
    this.db = new CardsDb($window);
    this.wine = null;
    this.edit = true;
    this.initDb = function initCardsDb() {
      console.log("Initialization of cards DB");
      //this.db.openCardsDatabase();
    };
    this.newWine = function newWine() {
      this.wine = new WineCardObject();
    };
    this.setEdit = function setEdit(val) {
      this.edit = Boolean(val);
    };
    this.getWineName = function getWineName() {
      return this.wine.getName();
    };
    this.setWineName = function setWineName(name) {
      this.wine.setName(name);
    };
    this.getWineYear = function getWineYear() {
      return this.wine.getWineYear();
    };
    this.setWineYear = function setWineYear(year) {
      this.wine.setWineYear(year);
    };
    this.getSparkling = function getSparkling() {
      return this.wine.getSparkling();
    };
    this.setSparkling = function setSparkling(sparkling) {
      this.wine.setSparkling(sparkling);
    };
    this.getParameters = function getParameters() {
      this.wine.getScores();
      return this.wine.getParameters();
    };
    this.getAttributesAndScores = function getAttributesAndScores(par) {
      return this.wine.getAttributesAndScores(par);
    };
    this.getWinePoints = function getWinePoints() {
      return angular.copy(this.wine.card.parameters);
    };
    this.setWinePoints = function setWinePoints(points) {
      this.wine.card.parameters = angular.copy(points);
    };
    this.resetValues = function resetValues() {
      this.wine.clearCard();
    };
    this.storeWine = function storeWine(ok,no) {
      this.wine.tot_score();
      this.db.addWine(this.wine.getScheda(),ok,no);
    };
    console.log("Instantiated TasteService");
    return this;
  }
  angular.module('WineCards.Taste')
    .service('TasteService', ['$window', '$translate', TasteService]);
})();
