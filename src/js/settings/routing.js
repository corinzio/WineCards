angular.module('WineCards').config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/settings', {
    templateUrl: '/tmpl/settings.html',
    controller: 'SettingsController'
  });
});
