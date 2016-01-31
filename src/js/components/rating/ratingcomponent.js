/** ratingcomponent.js **/
import angular from 'angular';
export default function ratingComponent() {
  'use strict';
  var rc = {};
  rc.restrict = 'AE';
  rc.scope = {
    score: '=score',
    max: '@max'
  };
  rc.template = require('./ratingcomponent.html');
  rc.link = function(scope, elements, attr) {
    /*
     * @method updateStars
     * add stars to scope.stars array
     */
    scope.updateStars = function() {
      var idx = 0;
      scope.stars = [];
      for (idx = 0; idx < scope.max; idx++) {
        scope.stars.push({
          full: scope.score > idx
        });
      }
    };
    /*
     * @method starClass
     * return the appropriate class for displaying a star
     */
    scope.starClass = function(star, idx) {
      var starClass = 'fa-star-o';
      if (star.full) {
        starClass = 'fa-star filled';
      }
      return starClass;
    };


    /**
     * watch on score attribute changes
     */
    scope.$watch('score', function(newValue, oldValue) {
      if (newValue !== null && newValue !== undefined) {
        scope.updateStars();
      }
    });
    /*
     * @method setRating
     * set rating value
     */
    scope.setRating = function(idx) {
      if ( (scope.score == idx + 1) && (scope.score !== 0)) {
        scope.score = scope.score - 1;
      } else {
        scope.score = idx + 1;
      }
      scope.stopHover();
    };
    /*
     * @method hover
     */
    scope.hover = function(idx) {
      scope.hoverIdx = idx;
    };
    /*
     * @method stopHover
     */
    scope.stopHover = function() {
      scope.hoverIdx = -1;
    };
  };
  return rc;
}
