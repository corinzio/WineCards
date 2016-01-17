export default function WineCard(sparkling){
    'use strict';
    let card = {};
    this.id = 0;
    this.wine_name = undefined;
    this.wine_year = undefined;
    this.date = undefined;
    this.parameters = {};
    this.parameters.seeing = {
      clearness: 0,
      tonality: 0,
      intensity: 0
    };
    if(sparkling === true){
      this.parameters.seeing.dimension = 0;
      this.parameters.seeing.persistence = 0;
    }
    this.parameters.smell = {
      frankness: 0,
      intensity: 0,
      finesse: 0,
      armony: 0
    };
    this.parameters.taste = {
      frankness: 0,
      intensity: 0,
      winebody: 0,
      armony: 0,
      persistence: 0,
    };
    if(sparkling !== true){
      this.parameters.taste.aftertaste = 0;
    }
    this.parameters.overall = {
      total: 0
    };
    this.sparkling = false;
    this.tot_score = 0;
}
