import ngRoute from 'angular-route';

export default function tasteroutes($routeProvider, $locationProvider) {
    $routeProvider.when('/wine/new', {
        template: require('./winedescr.html'),
        controller: 'WineDescrController',
        controllerAs: 'descCtrl'
    })
    .when('/wine/new/score',{
      template: require('./winescore.html'),
      controller: 'WineScoreController',
      controllerAs: 'scoreCtrl'
    });
}
