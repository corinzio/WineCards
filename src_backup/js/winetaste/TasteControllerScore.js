/**TasteControllerScore.js**/
(function() {
  /**
   * @ngdoc controller
   * @memberof WineCardsTaste
   * @name WineCardsTaste:TasteControllerScore
   * @description
   * Controller used to show and edit score parameters of a wine.
   */
  function TasteControllerScore($scope, $window, TasteService, $translate, $routeParams, $location) {
    this.parameters = undefined;
    this.scores = {};
    this.points = {};
    /**
     * @ngdoc method
     * @memberof WineCardsTaste:TasteControllerScore
     * @name backBtn
     * @description
     * Method used to respond to the BACKBTN event fired from the MasterController
     */
    this.backBtn = function bakBtn(event, data) {
      var back = $location.path()
        .replace('/score', '');
      $location.path(back)
        .replace();
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
     * @name init
     * @description
     * This method initialize the attributes used in the view reading values from the underlying service.
     * Called on controller instantiation.
     */
    this.init = function init() {
      if (this.parameters === undefined) {
        this.parameters = TasteService.getParameters();
        this.points = TasteService.getWinePoints();
        for (var i = 0; i < this.parameters.length; i++) {
          this.scores[this.parameters[i]] = TasteService.getAttributesAndScores(this.parameters[i]);
        }
      }
    };
    this.saveValues = function saveValues() {
      console.log(this.points);
      TasteService.setWinePoints(this.points);
    };
    this.resetValues = function resetValues() {
      TasteService.resetValues();
      this.points = TasteService.getWinePoints();
    };
    console.log("TasteControllerScore instantiated!");
    this.init();
    return this;
  }
  //end of TasteControllerScore
  angular.module('WineCards.Taste')
    .controller('TasteControllerScore', ['$scope', '$window', 'TasteService', '$translate', '$routeParams', '$location', TasteControllerScore]);
})();
