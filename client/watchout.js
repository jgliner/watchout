// start slingin' some d3 here.
var h = +d3.select('body').select('.stage').style('height').slice(0,-2);
var w = +d3.select('body').select('.stage').style('width').slice(0,-2);

var gameOptions = {
  height: h,
  width: w,
  nEnemies: 30
};

var gameStats = {
  score: 0,
  lives: 0
};