/**TasteControllerDescription.js**/
(function(){
  /**
   * @ngdoc controller
   * @memberof WineCardsTaste
   * @name WineCardsTaste:TasteControllerDescription
   * @description
   * Controller used to show and edit taste cards of a wine.
   */
   function TasteControllerDescription($scope,$window,TasteService, $translate, $routeParams, $location){
    this.wine_name = TasteService.getWineName();
    this.wine_year = TasteService.getWineYear();
    this.wine_sparkling = TasteService.getSparkling();

    this.setWineYear = function setWineYear(){
      TasteService.setWineYear(this.wine_year);
    };
    this.setWineName = function setWineName(){
      TasteService.setWineName(this.wine_name);
    };
    this.backBtn = function bakBtn(event, data) {
      console.log('receving backbtn');
      $window.history.back();
    };

    this.setSparkling = function setSparkling(){
      TasteService.setSparkling(this.wine_sparkling);
    };

    this.setWineDescription = function setWineDescription($event){
      this.setSparkling();
      this.setWineName();
      this.setWineYear();
      $location.path($location.path()+'/score');
    };

    $scope.$on('BACKBTN', this.backBtn);

    console.log("TasteControllerDescription instantiated!");
    return this;
   }


   angular.module('WineCards.Taste')
     .controller('TasteControllerDescription', ['$scope','$window','TasteService','$translate', '$routeParams', '$location', TasteControllerDescription]);

})();
