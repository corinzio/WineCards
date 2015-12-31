WineCards.angular.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/search', {
    templateUrl: '/tmpl/search.html',
    controller: 'SearchController'
  });
});
