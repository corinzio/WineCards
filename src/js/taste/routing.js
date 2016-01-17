import ngRoute from 'angular-route';

export default function tasteroutes($routeProvider, $locationProvider) {
    $routeProvider.when('/wine/new', {
        template: require('./winedescr.html'),
        controller: 'TasteDescrController',
        controllerAs: 'tasteDescrCtrl'
    });
}
