WineCards.angular.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/main', {
    templateUrl: '/tmpl/main.html',
    controller: 'MainController'
  });
});
