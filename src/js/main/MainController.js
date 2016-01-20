/**MainController.js**/
/**
 * Controller of the main page
 */
export default class MainController {
  constructor($scope, $location, WineCardService) {
    /**
     * @property {object} actions List of available actions on the main page
     */
    this.actions = [{
      desc_id: 'NEW_WINE_TXT',
      action_id: 'NEW_WINE_ACT',
      icon_id: 'fa fa-plus-square fa-2x'
    }, {
      desc_id: 'SEARCH_WINE_TXT',
      action_id: 'SEARCH_WINE_ACT',
      icon_id: 'fa fa-search fa-2x'
    }];
    /**
     * Execute action of the main page based on the action_id of the selected action property
     */
    this.executeAction = function executeAction(id) {
      console.log(id);
      switch (id) {
        case 'NEW_WINE_ACT':
          WineCardService.newWine();
          console.log('new wine');
          $location.path('/wine/new').replace();
          break;
      }
    };
    /**
     * @return list of actions available for the main page
     */
    this.getActions = function getActions() {
      return this.actions;
    };
    console.log("instantiate MainController");
  }
}
MainController.$inject = ['$scope', '$location', 'WineCardService'];
