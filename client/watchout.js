// start slingin' some d3 here.

// init
var h = +d3.select('body').select('.stage').style('height').slice(0,-2);
var w = +d3.select('body').select('.stage').style('width').slice(0,-2);

var gameOptions = {
  height: h,
  width: w,
  nEnemies: 15
};

var gameStats = {
  score: 0,
  lives: 10,
  highscore: 0
};

// IIFE enemy generator runs at load

function init() {
  var mouse = [0,0];
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

  //make every enemy in the array

  var heads = d3.select('body').select('svg').selectAll('.enemy')
    .data(createEnemies, function(d) {
      return d.id;
    });
  
  var svg = d3.select("svg");
  svg.on("mousemove",function() {
    mouse = d3.mouse(this);
    
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

  var move = function(element) {
    element.transition().duration(5000).ease('bounce')
      .attr('x', function(d) {
        return Math.random()*(w-100);
      })
      .attr('y', function(d) {
        return Math.random()*(h-100);
      })
      .each('end', function() {
        move(d3.select(this));
      });
  };
  move(heads);
  
  var currentScore = d3.select(".current").select("span");
  var lives = d3.select(".lives").select("span");
  var highScore = d3.select(".highscore").select("span");
  //update function that looks at gameStats for numbers

  setInterval(function() {
    gameStats.highscore = Math.max(gameStats.highscore, gameStats.score);
    gameStats.score++;
    currentScore.text(gameStats.score);
    lives.text(gameStats.lives);
    highScore.text(gameStats.highscore);
  },100);

  var prevCollisionState = false;
  var collisions = function() {
    var collision = false;
    heads.each(function() {
      var offsetX = this.x.animVal.value + 50;
      var offsetY = this.y.animVal.value + 50;

      var mouseX = offsetX - (mouse[0]);
      var mouseY = offsetY - (mouse[1]);

      if (Math.sqrt(mouseX*mouseX + mouseY*mouseY) < 32) {
        collision = true;
      }
    });
    if (collision) {
      svg.style('background-color', 'rgba(255,0,0,0.5)').transition().duration(50).each('end', function(){svg.style('background-color', 'transparent').transition();});
      if (prevCollisionState !== collision) {
        gameStats.lives--;
        gameStats.score = 0;
        
        console.log("SHOW ME WHAT YOU GOT");
      }
    }
    prevCollisionState = collision;

  };
  d3.timer(collisions);
}
init();

