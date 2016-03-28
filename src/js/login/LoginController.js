/** LoginController.js **/
export default class LoginController {
  constructor($window, $location, $scope, LoginService) {
    this.classname = 'LoginController';
    this.$window = $window;
    this.$location = $location;
    this.$scope = $scope;
    this.LoginService = LoginService;
    this.available = this.LoginService.getAvailability();
    this.logged = this.LoginService.isLogged();
    this.user = this.LoginService.getLogin();
    /**
     * Callback function for login
     */
    this.loginOk = function loginOk(obj) {
      this.$scope.$apply(() => {
        this.user = obj;
        this.available = this.LoginService.getAvailability();
        this.logged = this.LoginService.isLogged();
      });
    };
    this.loginErr = function loginErr(msg) {
      console.log(msg);
      this.$scope.$apply(() => {
        console.log("Error Login");
        this.user = this.LoginService.getLogin();
        this.available = this.LoginService.getAvailability();
        this.logged = this.LoginService.isLogged();
      });
    };
    this.logoutOk = function logoutOk() {
      this.$scope.$apply(() => {
        console.log("Logout performed");
        this.user = this.LoginService.getLogin();
        this.available = this.LoginService.getAvailability();
        this.logged = this.LoginService.isLogged();
      });
    };
    this.logoutErr = function logoutErr() {
      console.log("Logout error");
    };
    this.LoginService.addLoginCallbacks(this.classname, this.loginOk, this.loginErr, this);
    this.LoginService.addLogoutCallbacks(this.classname, this.logoutOk, this.logoutErr, this);
    /**
     * @signal listen to the BACKBTN signal from MasterController to perform the back navigation
     */
    this.$scope.$on('BACKBTN', (event, data) => {
      console.log("back received");
      console.log('receving backbtn');
      $window.history.back();
    });
    /**
     * manage destroy
     */
    $scope.$on('$destroy', () => {
      console.log("destroy LoginController");
      this.LoginService.delLoginCallbacks(this.classname);
      this.LoginService.delLogoutCallbacks(this.classname);
    });
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
  googleLogout() {
    this.LoginService.executeLogout();
    this.available = this.LoginService.getAvailability();
    this.logged = this.LoginService.isLogged();
    this.user = this.LoginService.getLogin();
  }
}
LoginController.$inject = ['$window', '$location', '$scope', 'LoginService'];
