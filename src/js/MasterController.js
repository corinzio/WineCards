/**MasterController.js**/
(function() {
  var MasterController = function($scope, $mdSidenav, $translate, $location, $window) {
    console.log("instantiating MasterController");
    $scope.goBack = function goBack() {
      console.log("emit backbutton");
      $scope.$broadcast('BACKBTN');
    };
    $scope.hideBack = function hideBack() {
      if ($location.path() === '/main') {
        return true;
      } else {
        return false;
      }
    };
    $scope.navigateTo = function navigateTo(nav_id) {
      $mdSidenav('leftMenu')
        .close();
      console.log(nav_id);
      switch (nav_id) {
        case 'NAV_SETTINGS':
          $location.path('/settings');
      }
    };
    $scope.toggleMenu = function toggleMenu() {
      $mdSidenav('leftMenu')
        .toggle();
    };
  };
  angular.module('WineCards')
    .controller('MasterController', ['$scope', '$mdSidenav', '$translate', '$location', '$window', MasterController]);
}());
//Directive to show sidebar "Settings"
angular.module('WineCards')
  .directive("leftMenu", function() {
    return {
      restict: 'E',
      templateUrl: 'tmpl/settings_menu.html',
      controller: 'MasterController'
    };
  });
