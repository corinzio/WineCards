WineCards.angular.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/wine/:wineId', {
    templateUrl: '/tmpl/winedescr.html',
    controller: 'TasteControllerDescription'
  });
});
