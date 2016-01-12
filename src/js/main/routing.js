import ngRoute from 'angular-route';

export default function mainroutes ($routeProvider) {
  $routeProvider.when('/main', {
    template: require('./main.html'),
    controller: 'MainController',
    controllerAs: 'mainCtrl'  
  });
};

mainroutes.$inject = ['$routeProvider'];