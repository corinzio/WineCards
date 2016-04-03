import angular from 'angular';
import WineDbService from ./WineDbService.js';

module.exports = (function() {
  'use strict';
  return angular.module('WineCards.Database', [])
  .service('WineDbService', WineDbService)
  .run(['WineDbService',function(db_srv){
    db_srv.createAndOpenDatabase();
  }])
  .name;
}());
