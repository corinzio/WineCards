/** WineSummaryController.js **/

export default class WineSummaryController{
  constructor($location, WineCardService){
    this.wine_name = WineCardService.getWineName();
    this.wine_year = WineCardService.getWineYear();
    this.points = WineCardService.getTotalPoints();
  }
}

WineSummaryController.$inject = ['$location','WineCardService'];
