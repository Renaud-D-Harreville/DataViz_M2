
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

var geoJsonFrance;

d3.queue()
	//.defer(d3.csv, "grippe.csv")
	.defer(d3.json, "../ressources/data/france.json)
	.await(function(error, /*grippe, */france) {
		if (error) {
			console.error('Oh dear, something went wrong: ' + error);
		}
		else {
			//dataGrippe = grippe;
			geoJsonFrance = france;

			displayMap();
		}
});

function displayMap() {
	g.selectAll("path")
	   .data(geoJsonFrance.features)
	   .enter()
	   .append("path")
		 .attr( "fill", "#ccc" )
	   .attr("d", path);
}
/*
d3.json("ressources/data/france.json", function(json) {
	g.selectAll("path")
	   .data(json.features)
	   .enter()
	   .append("path")
		 .attr( "fill", "#ccc" )
	   .attr("d", path);
});
*/
