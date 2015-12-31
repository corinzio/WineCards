angular.module('WineCards.Settings').controller('SettingsMenuController', ['$scope', '$mdSidenav', '$translate', '$location', '$window', function($scope, $mdSidenav, $translate, $location,$window) {
  $scope.toggleMenu = function toggleMenu() {
    $mdSidenav('leftMenu')
      .toggle();
  };
  $scope.navigateTo = function navigateTo(nav_id) {
    $mdSidenav('leftMenu').close();
    console.log(nav_id);
    switch(nav_id){
      case 'NAV_SETTINGS':
        $location.path('/settings');
    }
  };
  $scope.hideBack = function hideBack(){
    if($location.path() === '/main'){
      return true;
    }
    else{
      return false;
    }
  };
  $scope.goBack = function goBack(){
    $window.history.back();
  };
}]);

//Directive to show sidebar "Settings"
angular.module('WineCards.Settings').directive("leftMenu", function() {
  return {
    restict: 'E',
    templateUrl: '/tmpl/settings_menu.html',
    controller: 'SettingsMenuController'
  };
});
