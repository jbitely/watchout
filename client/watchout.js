// start slingin' some d3 here.
var enemyPos = [[200,250], [100, 350], [400, 100], [175, 50], [300, 300]];

var container = d3.select("body").append("svg").attr("height", "600px").attr("width", "600px")
                .attr("class", "container");



var update = function(data){
  // data join
  var enemies = container.selectAll("circle").data(data);
  console.log(enemies);
  // // add new enemies
  // enemies.enter().container.append("circle")
  //   .attr("cx", function(){

  //   })
  //   .attr("cy", function(){

  //   })
  //   .attr("r", "20")
  //   .attr("class", "enemy");
  // // position callbacks
  // var

};

// initial setup
update(enemyPos);
