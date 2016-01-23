// start slingin' some d3 here.
var enemyPos1 = [[200, 50], [100, 250], [150, 400], [430, 400], [275, 100]];
var enemyPos2 = [[50, 200], [250, 100], [400, 150], [400, 430], [100, 275],  [100, 100], [325, 50]];

var container = d3.select("body").append("svg").attr("height", "600px").attr("width", "600px")
                .attr("class", "container");

var drag = d3.behavior.drag()
  .on('dragstart', function() {  })
  .on('drag', function() { player.attr('cx', d3.event.x).attr('cy', d3.event.y);})
  .on('dragend', function() {});



var player = container.append("circle").attr("cx" , "300").attr("cy", "300").attr("r", "20")
              .attr("class", "player").call(drag);

  //drag function



var update = function(data){
  console.log('running update');
  // data join
  var enemies = container.selectAll("circle").data(data);

  // update & transition
  enemies.transition().duration(1000)
    .attr("cx", function(d) {
      console.log(d[0])
      return d[0];
    })
    .attr("cy", function(d) {
      console.log(d[1])
      return d[1];
    })
    .attr("r", "20");

  // enter
  enemies.enter().append("circle")
    .attr("cx", function(d) {
      return d[0];
    })
    .attr("cy", function(d) {
      return d[1];
    })
    .attr("r", "20")
    .attr("class", "enemy");
  // exit
};

//data randomizer helper
var randCoords = function(playerPos){

  var coordPoints = [playerPos];
  for(var i = 0; i < 6; i++){
    var xAxis = Math.random() * 600;
    var yAxis = Math.random() * 600;
    coordPoints.push([xAxis, yAxis]);
  }
  return coordPoints;
};



// initial setup
update(randCoords([300,300]));

// movement loop
setInterval(function() {
  update(randCoords([300,300]));
}, 700);
