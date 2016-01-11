/**MainController.js**/
(function() {
  var MainController = function MainController($scope, TasteService, $location) {
    $scope.actions = [{
      desc_id: 'NEW_WINE_TXT',
      action_id: 'NEW_WINE_ACT',
      icon_id: 'fa fa-plus-square fa-2x'
    }, {
      desc_id: 'SEARCH_WINE_TXT',
      action_id: 'SEARCH_WINE_ACT',
      icon_id: 'fa fa-search fa-2x'
    }];
    $scope.executeAction = function executeAction(id) {
      console.log(id);
      switch (id) {
        case 'NEW_WINE_ACT':
          TasteService.newWine();
          console.log('redirect path');
          $location.path('/wine/1');
          break;
      }
    };
    $scope.getActions = function getActions() {
      return $scope.actions;
    };
  };
  angular.module('WineCards')
    .controller('MainController', ['$scope', 'TasteService', '$location', MainController]);
})();
