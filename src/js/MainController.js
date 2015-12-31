angular.module('WineCards').controller('MainController', ['$scope', function($scope) {
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
  };
  $scope.getActions = function getActions() {
    return $scope.actions;
  };
}]);
