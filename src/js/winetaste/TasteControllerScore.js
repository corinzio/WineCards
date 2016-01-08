/**TasteControllerScore.js**/
(function(){
  /**
   * @ngdoc controller
   * @memberof WineCardsTaste
   * @name WineCardsTaste:TasteControllerScore
   * @description
   * Controller used to show and edit score parameters of a wine.
   */
   function TasteControllerScore($scope,$window,TasteService, $translate, $routeParams){

     /**
      * @ngdoc method
      * @memberof WineCardsTaste:TasteControllerScore
      * @name backBtn
      * @description
      * Method used to respond to the BACKBTN event fired from the MasterController
      */
    this.backBtn = function bakBtn(event, data) {
      console.log('receving backbtn');
      $window.history.back();
    };

  /**
   * @ngdoc event
   * @memberof WineCardsTaste:TasteControllerScore
   * @eventof WineCards:MasterController:BACKBTN
   * @description
   * Listener of event BACKBTN fired from Mastercontroller to go back from current view
   */
    $scope.$on('BACKBTN', this.backBtn);

    /**
     * @ngdoc method
     * @memberof WineCardsTaste:TasteControllerScore
     * @name getParameters
     * @return {array} Array of parameters to be evaluated.
     * @description
     * This method returns the array of paramaters ('seeing','taste',..) that should be evalueted in the wine.
     */
    this.getParameters = function getParameters(){
      console.log("get parameters from score controller");
      return TasteService.getParameters();
    };



    console.log("TasteControllerScore instantiated!");

    return this;
   }
   //end of TasteControllerScore






   angular.module('WineCards.Taste')
     .controller('TasteControllerScore', ['$scope','$window','TasteService','$translate', '$routeParams', TasteControllerScore]);


     //Directive to show sidebar "Settings"
     angular.module('WineCards.Taste')
       .directive("paramOfWine", function() {
         return {
           restict: 'E',
           templateUrl: 'tmpl/wine_parameter.html',
           controller: 'TasteControllerScore'
         };
       });

})();
