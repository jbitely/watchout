// start slingin' some d3 here.
var enemyPos = [[200, 50], [100, 250], [150, 400], [430, 400], [275, 100]];

var container = d3.select("body").append("svg").attr("height", "600px").attr("width", "600px")
                .attr("class", "container");



var update = function(data){
  // data join
  var enemies = container.selectAll("circle").data(data);
  // console.log(enemies);
  // add new enemies
  enemies.enter().append("circle")
    .attr("cx", function(d) {
      return d[0];
    })
    .attr("cy", function(d) {
      return d[1];
    })
    .attr("r", "20")
    .attr("class", "enemy");

};

// initial setup
update(enemyPos);
