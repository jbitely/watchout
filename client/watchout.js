// start slingin' some d3 here.
var enemyPos1 = [[200, 50], [100, 250], [150, 400], [430, 400], [275, 100]];
var enemyPos2 = [[50, 200], [250, 100], [400, 150], [400, 430], [100, 275],  [100, 100], [325, 50]];

var container = d3.select("body").append("svg").attr("height", "600px").attr("width", "600px")
                .attr("class", "container");



var update = function(data){
  console.log('running update');
  // data join
  var enemies = container.selectAll("circle").data(data);

  // update & transition
  enemies.transition().duration(1000)
    .attr("cx", function(d) {
      return d[0];
    })
    .attr("cy", function(d) {
      return d[1];
    })
    .attr("r", "20")
    .attr("class", "update");

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

// initial setup
update(enemyPos1);

update(enemyPos2);

//data randomizer helper
