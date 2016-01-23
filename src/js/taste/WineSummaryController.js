/** WineSummaryController.js **/
export default class WineSummaryController {
  constructor($location, WineCardService, $translate,$scope) {
    this.wine_name = WineCardService.getWineName();
    this.wine_year = WineCardService.getWineYear();
    this.points = WineCardService.getTotalPoints();
    this.note = WineCardService.getNote();
    this.saveWine = function() {
      WineCardService.setNote(this.note);
      console.log("saveWine");
    };
    this.backBtn = function bakBtn(event, data) {
      $location.path('/wine/new/score')
        .replace();
    };
    /**
     * @signal listen to the BACKBTN signal from MasterController to perform the back navigation
     */
    $scope.$on('BACKBTN', this.backBtn);
  }
}
WineSummaryController.$inject = ['$location', 'WineCardService', '$translate','$scope'];
