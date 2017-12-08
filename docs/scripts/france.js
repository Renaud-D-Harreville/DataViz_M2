
var width = 700,
height = 580;
var svg = d3.select( "#jeu" )
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
	.defer(d3.json, "ressources/data/france.json")
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
var cities = [ 
                {'pos': [2.351, 48.857], 'name': 'Paris'},
                {'pos':[5.381, 43.293], 'name': 'Marseille'},
                {'pos':[3.878, 43.609], 'name': 'Montpellier'},
                {'pos':[4.856, 45.756], 'name': 'Lyon'}, 
                {'pos':[1.436, 43.602], 'name': 'Toulouse'},
                {'pos':[-0.566, 44.841], 'name': 'Bordeaux'},
                {'pos':[-1.553, 47.212], 'name': 'Nantes'},
                {'pos':[8.737, 41.925], 'name': 'Ajaccio'},
              ];


var city_labels =svg.selectAll(".city_label")
    .data(cities)
    .enter();

  city_labels
    .append("text")
    .attr("class", "city_label")
    .text(function(d){return d.name;})
    .attr("font-family", "AquilineTwoRegular")
    .attr("font-size", "18px")
    .attr("fill", "#544")
    .attr("x",function(d){return projection(d.pos)[0];})
    .attr("y",function(d){return projection(d.pos)[1];})
    .on("mouseover",function(){console.log("gnn")});


  city_labels
    .append("circle")
    .attr("r", 3)
    .attr("id",function(d){return d.name;})
    .attr("fill", "black")
    .attr("cx",function(d){return projection(d.pos)[0];})
    .attr("cy",function(d){return projection(d.pos)[1];});


