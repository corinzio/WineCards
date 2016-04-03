import angular from 'angular';
import Dexie from 'Dexie';

export default class WineDbService{
  constructor($window, $translate, $q) {
    this.$q = $q;
    this.$translate = $translate;
    this.$window = $window;
    this.cardsDB = null;
  }

  createAndOpenDatabase() {
    this.cardsDB = new Dexie('cards');
    this.cardsDB.version(1).stores({
      cards: "++id,wine_name,commercial_name,producer,wine_year,date'
    });

    //Now open the database
    this.cardsDB.open();
  }

  saveWineCard(card){
    this.cardsDB.cards.add(card);
  }

}
WineDbService.$inject = ['$window', '$translate', '$q'];
