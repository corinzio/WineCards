/**MasterController.js**/
import angular from "angular";

/**
 * Master Controller of the application it is the parent controller of anything in ngview.
 * Manage left side menu show/hide and navigation
 */
export default class MasterController {
  constructor($scope, $mdSidenav, $translate, $location, $window, $mdToast, $q, LoginService) {
    this.LoginService = LoginService;
    this.ToastService = $mdToast;
    console.log("instantiating MasterController");
    /**
     * Back button pressed
     */
    $scope.goBack = function goBack() {
      console.log("emit backbutton");
      $scope.$broadcast('BACKBTN');
    };
    /**
     * Hide Back button
     */
    $scope.hideBack = function hideBack() {
      if ($location.path() === '/main') {
        return true;
      } else {
        return false;
      }
    };
    /**
     * Manage navigation from left side menu switching the location accordingly.
     * @param {String} nav_id navigation identifier from left menu.
     */
    $scope.navigateTo = function navigateTo(nav_id) {
      $mdSidenav('leftMenu')
        .close();
      console.log(nav_id);
      switch (nav_id) {
        case 'NAV_SETTINGS':
          $location.path('/settings');
          break;
        case 'NAV_USER':
          $location.path('/login');
          break;
      }
    };
    /**
     * Shows/Hides the left side menu
     */
    $scope.toggleMenu = function toggleMenu() {
      console.log("called toggleMenu");
      $mdSidenav('leftMenu')
        .toggle();
    };

    $scope.toastMessage = function toastMessage(string){
      $mdToast.show($mdToast.simple()
        .textContent(string)
        .position("top left")
        .hideDelay(2000));
    };

    /**
     * Login Callbacks
     */
     this.loginOk = function(obj){
       console.log("mastercontroller login success");
       this.ToastService.show($mdToast.simple()
         .textContent(obj.name)
         .position("top left")
         .hideDelay(2000));
     };

     this.loginErr = function(msg){
       console.log("login error MasterController");
     };

     console.log("MasterController instantiated");
     console.log("configure login service from MasterController");
     this.LoginService.addLoginCallbacks(this.classname,this.loginOk, this.loginErr, this);
     var a = this.LoginService.configureLogin();
     a.then(function(){this.LoginService.executeLogin(true);}.bind(this));
  }
}
MasterController.$inject = ['$scope', '$mdSidenav', '$translate', '$location', '$window', '$mdToast', '$q', 'LoginService'];
