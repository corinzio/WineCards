/**MainController.js**/
export default class MainController {
    constructor($scope,$location) {
        this.actions = [{
            desc_id: 'NEW_WINE_TXT',
            action_id: 'NEW_WINE_ACT',
            icon_id: 'fa fa-plus-square fa-2x'
    }, {
            desc_id: 'SEARCH_WINE_TXT',
            action_id: 'SEARCH_WINE_ACT',
            icon_id: 'fa fa-search fa-2x'
    }];
        this.executeAction = function executeAction(id) {
            console.log(id);
            switch (id) {
                case 'NEW_WINE_ACT':
                    //TasteService.newWine();
                    console.log('redirect path');
                    //$location.path('/wine/1');
                    break;
            }

        }
        this.getActions = function getActions() {
            return this.actions;
        };
    console.log("instantiate MainController");
    }
};

MainController.$inject = ['$scope', '$location'];