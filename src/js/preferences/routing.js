import ngRoute from 'angular-route';

export default function prefroutes($routeProvider, $locationProvider) {
    $routeProvider.when('/settings', {
        template: require('./generalPref.html'),
        controller: 'GeneralPrefController',
        controllerAs: 'genPrefCtrl'
    });
}

prefroutes.$inject = ['$routeProvider', '$locationProvider'];
