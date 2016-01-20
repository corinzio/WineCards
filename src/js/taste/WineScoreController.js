/** WineScoreController.js **/

export default class WineScoreController{
  constructor(WineCardService,$tranlate,$scope,$location){
    this.params = WineCardService.getParameters();
    this.scores = WineCardService.getScores();
    this.points = WineCardService.getValues();

    this.getParamValues = function getParamValues(par){
      var test = Object.keys(this.scores.parameters[par]);
      return test;
    };
    this.getDescription = function getDescription(par,val){
      var idx = this.points[par][val];
      var a = this.scores.parameters[par][val][idx][1];
      return a;
    };
    this.reset = function reset(){
      this.points = WineCardService.resetValues();
    };
    this.save = function save(){
      WineCardService.saveValues( this.points );
      WineCardService.getTotalPoints();
    };
    this.backBtn = function bakBtn(event, data) {
      $location.path('/wine/new')
        .replace();
    };
    /**
     * @signal listen to the BACKBTN signal from MasterController to perform the back navigation
     */
    $scope.$on('BACKBTN', this.backBtn);
    console.log("Instantiated WineScoreController");
  }
}



WineScoreController.$inject = ['WineCardService','$translate','$scope','$location'];
