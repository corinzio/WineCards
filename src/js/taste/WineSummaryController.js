/** WineSummaryController.js **/
export default class WineSummaryController {
  constructor($location, WineCardService, $translate, $scope) {
    this.WineCardService = WineCardService;
    this.$location = $location;
    this.$translate = $translate;
    this.$scope = $scope;
    this.wine_name = WineCardService.getWineName();
    this.wine_year = WineCardService.getWineYear();
    this.points = WineCardService.getTotalPoints();
    this.note = WineCardService.getNote();
    this.photo = WineCardService.getPhoto();
    this.commercial_name = WineCardService.getCommercialName();
    this.producer = WineCardService.getProducer();
    this.sparkling  = undefined;
    if( WineCardService.getSparkling() === true ){
      this.sparkling = 'SPARKLING';
    }
    else{
      this.sparkling = 'STILL';
    }
    /**
     * @signal listen to the BACKBTN signal from MasterController to perform the back navigation
     */
    $scope.$on('BACKBTN', function(event, data) {
      console.log("back received");
      this.$location.path('/wine/new/score')
        .replace();
    }.bind(this));
  }

  saveWine(){
    this.WineCardService.setNote(this.note);
    this.WineCardService.setCommercialName(this.commercial_name);
    this.WineCardService.setProducer(this.producer);
    this.WineCardService.dbSave().then(function(key){
      console.log("saved key: " + key);
      this.$scope.$parent.toastMessage(this.$translate.instant("WINE_SAVE_SUCCESS",{id: key}));
      this.$location.path("/").replace();
    }.bind(this))
    .catch(function(err){
      console.log("error: " +err);
      this.$scope.$parent.toastMessage(err);
    }.bind(this));
  }

  addPhoto() {
    navigator.camera.getPicture(this.okPhoto.bind(this), this.errPhoto.bind(this), {
      destinationType: Camera.DestinationType.DATA_URL,
      quality: 33,
      correctOrientation: true,
      targetWidth: 480,
      targetHeight: 640,
      encodingType: Camera.EncodingType.JPEG,
      allowEdit: false
    });
  }
  okPhoto(img_data) {
    this.photo = "data:image/jpeg;base64," + img_data;
    this.WineCardService.setPhoto(this.photo);
  }
  errPhoto(err_msg) {
    console.log("error photo: " + err_msg);
  }
}
WineSummaryController.$inject = ['$location', 'WineCardService', '$translate', '$scope'];
