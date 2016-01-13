import ngRoute from 'angular-route';

export default function prefroutes($routeProvider, $locationProvider) {
    $routeProvider.when('/settings', {
        templateUrl: require('./generalPref.html'),
        controller: 'GeneralPrefController'
    });
};

prefroutes.$inject = ['$routeProvider', '$locationProvider'];