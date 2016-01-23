// start slingin' some d3 here.

var container = d3.select("body").append("svg").attr("height", "600px").attr("width", "600px")
                .attr("class", "container");


var enemy = container.append("circle").attr("cx", "10").attr("cy", "10"). attr("r", "20").attr("class", "enemy");
