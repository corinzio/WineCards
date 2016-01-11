angular.module('WineCards').config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/wine/:wineId', {
    templateUrl: 'tmpl/winedescr.html',
    controller: 'TasteControllerDescription',
    controllerAs: 'descCtrl'
  });
  $routeProvider.when('/wine/:wineId/score',{
    templateUrl: 'tmpl/winescore.html',
    controller: 'TasteControllerScore',
    controllerAs: 'scoreCtrl'
  });
});
