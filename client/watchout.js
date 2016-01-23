// start slingin' some d3 here.

// init
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

// floating head enemies
var createEnemies = [];
for (var i = 0; i < gameOptions.nEnemies; i++) {
  createEnemies.push(i);
}

createEnemies = createEnemies.map(function(enemy) {
  var obj = {
    id: enemy,
    x: Math.random()*w,
    y: Math.random()*h
  };
  return obj;
});