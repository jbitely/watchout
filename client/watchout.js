// start slingin' some d3 here.
var higherScore = 0;
var currentScore = 0;
var totalCollisions = 0;

var container = d3.select("body").append("svg").attr("height", "600px").attr("width", "600px")
                .attr("class", "container");

//drag function
var drag = d3.behavior.drag()
  .on('dragstart', function() {})
  .on('drag', function() {
    //d3.event.x // d3.event.y
    player.attr('cx', d3.event.x)

    .attr('cy', d3.event.y);
  })
  .on('dragend', function() {});


var player = container.append("circle").attr("cx" , "300").attr("cy", "300").attr("r", "20")
              .attr("class", "player").call(drag);

var prevCollision = false;
var collideCheck = function(){
  console.log('collideCheck ran');
  var collided = false;
  // var prevCollision = false;

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
    if(distance <= radii){
      collided = true;
      console.log("collision!");
            // d3.selectAll(".enemy").transition();
      //reset game;
    }
  });
  if(collided){
    currentScore = 0;
    if(prevCollision != collided){
      totalCollisions++;
    }
  }
  prevCollision = collided;
}
var enemies = container.selectAll(".enemy")
  .data(d3.range(5))
  enemies.enter().append("circle")
    .attr("cx", function(d) {
      return Math.random() * 600;
    })
    .attr("cy", function(d) {
      return Math.random() * 600;
    })
    .attr("r", "20")
    .attr("class", "enemy");


var moveEnemies = function(){  //change function name
  // data join



  // update & transition
  enemies.transition().duration(2000)
    // collision detection
    // .tween("collideCheck", collideCheck)
    .attr("cx", function(d) {
      return Math.random() * 600;
    })
    .attr("cy", function(d) {
      return Math.random() * 600;
    })
    .attr("r", "20")
    .each('end', function() {
      moveEnemies(d3.select(this));
    });

  // enter

  // exit
    // enemies.exit().remove();
};

//data randomizer helper
// var randCoords = function(playerPos){

//   var coordPoints = [playerPos];
//   for(var i = 0; i < 6; i++){
//     var xAxis = Math.random() * 600;
//     var yAxis = Math.random() * 600;
//     coordPoints.push([xAxis, yAxis]);
//   }
//   return coordPoints;
// };

// initial setup
// function initialize(collisionCount) {
// console.log('initialize called');
//   console.log(totalCollisions);


//   // reset current score

//   // clearInterval(enemyMove);
//   moveEnemies([]);
//   // reset player position
//   // start enemy movement again
//   // update([1,2,3,4,5]);
//   // gameTimer = setInterval(function() {
//   //   moveEnemies([1,2,3,4,5]);
//   // }, 3000);
// }

// initialize(0);
//clear current board and call update

// movement loop
moveEnemies()

//current score
// currentScore++;
//   document.getElementById("current").innerHTML = currentScore;
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

setInterval(scoreTicker, 100);
d3.timer(collideCheck);
