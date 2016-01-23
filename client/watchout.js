// start slingin' some d3 here.
var enemyPos1 = [[200, 50], [100, 250], [150, 400], [430, 400], [275, 100]];
var enemyPos2 = [[50, 200], [250, 100], [400, 150], [400, 430], [100, 275],  [100, 100], [325, 50]];

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


var collideCheck = function(){
  return function() {
    var enemyX = Math.floor(d3.select(this).attr('cx'));
    var enemyY = Math.floor(d3.select(this).attr('cy'));
    var playerX = Math.floor(player.attr('cx'));
    var playerY = Math.floor(player.attr('cy'));
    console.log("enemy: " + enemyX + "," + enemyY);
  }
}



var update = function(data){  //change function name
  // data join
  var enemies = container.selectAll(".enemy").data(data);

  // update & transition
  enemies.transition().duration(2000)
    // collision detection
      // player.cx, player.cy
      //this.cx, this.cy
    .tween("collideCheck", collideCheck)
    .attr("cx", function(d) {
      return Math.random() * 600;
    })
    .attr("cy", function(d) {
      return Math.random() * 600;
    })
    .attr("r", "20");

  // enter
  enemies.enter().append("circle")
    .attr("cx", function(d) {
      return Math.random() * 600;
    })
    .attr("cy", function(d) {
      return Math.random() * 600;
    })
    .attr("r", "20")
    .attr("class", "enemy");
  // exit
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
update([1]);

// movement loop
setInterval(function() {
  update([1]);
}, 1500);
