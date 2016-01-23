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

// IIFE enemy generator runs at load

(function() {
  // floating head enemies
  var createEnemies = [];
  for (var i = 0; i < gameOptions.nEnemies; i++) {
    createEnemies.push(i);
  }
  createEnemies = createEnemies.map(function(enemy) {
    var obj = {
      id: enemy,
      x: Math.random()*(w-100),
      y: Math.random()*(h-100)
    };
    return obj;
  });

  //make every enemny in the array

  var heads = d3.select('body').select('svg').selectAll('.enemy')
    .data(createEnemies, function(d) {
      return d.id;
    });
  
  heads.enter()
    .append('image')
    .attr('id', function(d) {
      return d.id;
    })
    .attr('x', function(d) {
      return d.x;
    })
    .attr('y', function(d) {
      return d.y;
    })
    .attr('xlink:href', function(d) {
      return './asteroid.png';
    })
    .attr('class', 'enemy');

})();