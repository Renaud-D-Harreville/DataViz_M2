
var width = 700,
height = 580;
var svg = d3.select( "body" )
	.append( "svg" )
	.attr( "width", width )
	.attr( "height", height );
// On rajoute un groupe englobant toute la visualisation pour plus tard
var g = svg.append( "g" ); 

var projection =  d3.geoConicConformal()
					.center([2.454071, 46.279229])
				.scale(2800);
var path = d3.geoPath()
			 .projection(projection);

d3.json("ressources/data/france.json", function(json) {
	g.selectAll("path")
	   .data(json.features)
	   .enter()
	   .append("path")
		 .attr( "fill", "#ccc" )
	   .attr("d", path);
});

