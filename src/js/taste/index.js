import routing from './routing.js';
import WineCardService from "./WineCardService.js";
import WineDescrController from "./WineDescrController.js";
import WineScoreController from "./WineScoreController.js";
import WineSummaryController from "./WineSummaryController.js";


/**
* Module for the tasting cards.
*/
module.exports = (function () {
    'use strict';
    return angular.module('WineCards.Taste', ['pascalprecht.translate', 'ngRoute'])
    .service('WineCardService',WineCardService)
    .controller('WineDescrController',WineDescrController)
    .controller('WineScoreController',WineScoreController)
    .controller('WineSummaryController', WineSummaryController)
    .config(routing)
    .name;
}());
