(function(){
  /**
   * @ngdoc controller
   * @memberof WineCardsTaste
   * @name WineCardsTaste:TasteController
   * @description
   * Controller used to show and edit taste cards of a wine.
   */
   function TasteControllerDescription(TasteService, $translate, $routeParams){

    console.log("TasteControllerDescription instantiated!");
    return this;
   }


   angular.module('WineCards.Taste')
     .controller('TasteControllerDescription', ['TasteService','$translate', '$routeParams', TasteControllerDescription]);

})();
