/** LoginController.js **/
export default class LoginController {
  constructor($window, $location, $scope, LoginService) {
    this.$window = $window;
    this.$location = $location;
    this.$scope = $scope;
    this.LoginService = LoginService;
    /**
     * @signal listen to the BACKBTN signal from MasterController to perform the back navigation
     */
    this.$scope.$on('BACKBTN', function(event, data) {
      console.log("back received");
      console.log('receving backbtn');
      $window.history.back();
    }.bind(this));
    $scope.$on('$destroy', function() {
      console.log("destroy LoginController");
    }.bind(this));
  }
  getAvailability() {
    return this.LoginService.getAvailability();
  }
  isLogged() {
    return this.LoginService.isLogged();
  }
  getUserFullname() {
    return this.LoginService.getUserFullname();
  }
  googleLogin() {
    this.LoginService.executeLogin();
  }
}
LoginController.$inject = ['$window', '$location', '$scope', 'LoginService'];
