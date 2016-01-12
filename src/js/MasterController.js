/**MasterController.js**/
export default class MasterController {
    constructor($scope, $mdSidenav, $translate, $location, $window) {
        console.log("instantiating MasterController");
        $scope.goBack = function goBack() {
            console.log("emit backbutton");
            $scope.$broadcast('BACKBTN');
        };
        $scope.hideBack = function hideBack() {
            console.log("hideback called");
            if ($location.path() === '/main') {
                return true;
            } else {
                return false;
            }
        };
        $scope.navigateTo = function navigateTo(nav_id) {
            $mdSidenav('leftMenu')
                .close();
            console.log(nav_id);
            switch (nav_id) {
                case 'NAV_SETTINGS':
                    $location.path('/settings');
            }
        };
        $scope.toggleMenu = function toggleMenu() {
            console.log("called toggleMenu");
            $mdSidenav('leftMenu')
                .toggle();
        };
    };
};

MasterController.$inject = ['$scope', '$mdSidenav', '$translate', '$location', '$window'];