export default function WineScore(sparkling) {
  var score8 = [
    [0, "NEGATIVE"],
    [2, "POOR"],
    [4, "INSUFF"],
    [5, "SUFF"],
    [6, "GOOD"],
    [7, "OPTIM"],
    [8, "EXCELLENT"]
  ];
  var score7 = [
    [0, "NEGATIVE"],
    [2, "POOR"],
    [3, "INSUFF"],
    [4, "SUFF"],
    [5, "GOOD"],
    [6, "OPTIM"],
    [7, "EXCELLENT"]
  ];
  var score6 = [
    [0, "NEGATIVE"],
    [1, "POOR"],
    [2, "INSUFF"],
    [3, "SUFF"],
    [4, "GOOD"],
    [5, "OPTIM"],
    [6, "EXCELLENT"]
  ];
  this.parameters = {};
  this.parameters.seeing = {};
  this.parameters.smell = {};
  this.parameters.taste = {};
  this.parameters.overall = {};
  if (sparkling === true) {
    //punteggi spumante
    this.parameters.seeing.clearness = score6;
    this.parameters.seeing.dimension = score6;
    this.parameters.seeing.persistence = score6;
    this.parameters.seeing.tonality = score6;
    this.parameters.seeing.intensity = score6;
    this.parameters.smell.frankness = score7;
    this.parameters.smell.intensity = score7;
    this.parameters.smell.finesse = score7;
    this.parameters.smell.armony = score7;
    this.parameters.taste.frankness = score7;
    this.parameters.taste.intensity = score7;
    this.parameters.taste.winebody = score7;
    this.parameters.taste.armony = score7;
    this.parameters.taste.persistence = score7;
    this.parameters.overall.total = score7;
  } else {
    //punteggi fermi
    this.parameters.seeing.clearness = score6;
    this.parameters.seeing.tonality = score6;
    this.parameters.seeing.intensity = score6;
    this.parameters.smell.frankness = score6;
    this.parameters.smell.intensity = score8;
    this.parameters.smell.finesse = score8;
    this.parameters.smell.armony = score8;
    this.parameters.taste.frankness = score6;
    this.parameters.taste.intensity = score8;
    this.parameters.taste.winebody = score8;
    this.parameters.taste.armony = score8;
    this.parameters.taste.persistence = score8;
    this.parameters.taste.aftertaste = score6;
    this.parameters.overall.total = score8;
  }
}
