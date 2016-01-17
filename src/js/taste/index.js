import routing from './routing.js';
import WineCardManager from "./WineCardManager";


/**
* Module for the tasting cards.
*/
module.exports = (function () {
    'use strict';
    return angular.module('WineCards.Taste', ['pascalprecht.translate', 'ngRoute'])
    .config(routing)
    .name;
}());
