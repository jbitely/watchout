// start slingin' some d3 here.
// global variables
var higherScore = 0;
var currentScore = 0;
var totalCollisions = 0;

//game stage
var container = d3.select("body").append("svg")
  .attr("height", "600px")
  .attr("width", "600px")
  .attr("class", "container");

//drag function
var drag = d3.behavior.drag()
  .on('dragstart', function() {})
  .on('drag', function() {
    player.attr('cx', d3.event.x)
    .attr('cy', d3.event.y);
  })
  .on('dragend', function() {});

// player object
var player = container.append("circle")
  .attr("cx" , "300")
  .attr("cy", "300")
  .attr("r", "15")
  .attr("class", "player")
  .call(drag);

// enemies object
var enemies = container.selectAll(".enemy")
  .data(d3.range(15))
  enemies.enter().append("circle")
    .attr("cx", function(d) {
      return Math.random() * 600;
    })
    .attr("cy", function(d) {
      return Math.random() * 600;
    })
    .attr("r", "15")
    .attr("class", "enemy");

var prevCollision = false;
var collideCheck = function(){
  console.log('collideCheck ran');
  var collided = false;
  enemies.each(function() {
    var enemyX = Math.floor(d3.select(this).attr('cx'));
    var enemyY = Math.floor(d3.select(this).attr('cy'));
    var enemyR = Number(d3.select(this).attr('r'));
    var playerX = Math.floor(player.attr('cx'));
    var playerY = Math.floor(player.attr('cy'));
    var playerR = Number(player.attr('r'));
    // get distance between centers
    var distance = Math.pow(enemyX - playerX, 2) + Math.pow(enemyY - playerY, 2);
    // get radius distance
    var radii = Math.pow((enemyR + playerR), 2);
    // if distance <= radius distance, they are colliding
    if(distance <= radii) {
      collided = true;
    }
  });
  if(collided){
    currentScore = 0;
    if(prevCollision != collided){
      totalCollisions++;
      container.style("background-color", "blue");
    }
    else {
      container.style("background-color", "grey");
    }
  }
  prevCollision = collided;
}

var moveEnemies = function(){
  enemies.transition().duration(1000)
    .attr("cx", function(d) {
      return Math.random() * 600;
    })
    .attr("cy", function(d) {
      return Math.random() * 600;
    })
    .attr("r", "15")
    .each('end', function() {
      moveEnemies(d3.select(this));
    });
};

var scoreUpdate = function() {
  d3.select('.scoreboard .current span').text(currentScore);
  d3.select('.scoreboard .high span').text(higherScore);
  d3.select('.scoreboard .collisions span').text(totalCollisions);
};

var scoreTicker = function() {
  currentScore++;
  higherScore = Math.max(higherScore, currentScore);
  scoreUpdate();
};

moveEnemies()
setInterval(scoreTicker, 100);
d3.timer(collideCheck);
