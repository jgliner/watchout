// start slingin' some d3 here.

// init
var h = +d3.select('body').select('.stage').style('height').slice(0,-2);
var w = +d3.select('body').select('.stage').style('width').slice(0,-2);

var gameOptions = {
  height: h,
  width: w,
  nEnemies: 2
};

var gameStats = {
  score: 0,
  lives: 0
};

// IIFE enemy generator runs at load

function init() {
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
  
  var svg = d3.select("svg");
  svg.on("mousemove",function() {
    var coords = d3.mouse(this);
    // console.log(heads.attr("x"));
    if (coords[0] - heads.attr("x") < 5 && coords[1] - heads.attr("y") < 5) {
      console.log("touching");
    }
    //check to see if coords collide with a head
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

  setInterval(function() {
    heads.transition()
    .duration(1500)
    .attr('x', function(d) {
      return Math.random()*(w-100);
    })
    .attr('y', function(d) {
      return Math.random()*(h-100);
    });
  }, 5000);
}
init();

