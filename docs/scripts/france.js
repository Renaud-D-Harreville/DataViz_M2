//----------------------------------------------------------------
// Author : Mathilde 
// Date : December 2017 
// File : display the map
//----------------------------------------------------------------
// data of the cities
var cities;
d3.queue()
	.defer(d3.json, "ressources/data/coordVilles.json")
	.await(function(error,villes) {
		if (error) {
			console.error('Oh dear, something went wrong: ' + error);
		}
		else {
			cities = villes;
      createmap();
		}
});
//----------------------------------------------------------------
// create the svg 
var width = 700, height = 580;
var svg = d3.select( "#map" )
	.append( "svg" )
	.attr( "width", width )
	.attr( "height", height );
var g = svg.append( "g" ); 

//----------------------------------------------------------------
// create the projection of France 
var projection =  d3.geoConicConformal()
					          .center([2.454071, 46.279229])
			            	.scale(2800);
var path = d3.geoPath()
			 .projection(projection);


//----------------------------------------------------------------
// d3 visualisation of the map
var geoJsonFrance;
function createmap(){
  //-------------------------------------------------------------
  //launch data of the map
  d3.queue()
    .defer(d3.json, "ressources/data/france.json")
    .await(function(error,france) {
      if (error) {
        console.error('Oh dear, something went wrong: ' + error);
      }
      else {
        geoJsonFrance = france;
        displayMap();
      }
  });

  //-------------------------------------------------------------
  // create cities 
  var city_labels =svg.selectAll(".city_label")
      .data(cities)
      .enter();

  //-------------------------------------------------------------
  // labels of the cities 
    city_labels
      .append("text")
      .attr("class", "city_label")
      .attr("class",function(d){  return d.name.replace(/\s/g, '');})
      .text(function(d){return d.name;})
      .attr("font-size", "11px")
      .attr("fill", "#585858")
      .attr("x",function(d){return projection(d.pos)[0];})
      .attr("y",function(d){return projection(d.pos)[1];})
      .on("mouseover", function(d){
                            d3.selectAll("."+d.name.replace(/\s/g, '')).attr("fill","black")
                            displayPathsCurrentPlayer(d.name)
      })
      .on("mouseout",function(d){
                            d3.selectAll("."+d.name.replace(/\s/g, '')).attr("fill","#585858")
          
      });
  //-------------------------------------------------------------
  // circles of the cities 
    city_labels
      .append("circle")
      .attr("r", 3)
      .attr("class",function(d){return d.name.replace(/\s/g, '');})
      .attr("fill", "#585858")
      .attr("cx",function(d){return projection(d.pos)[0];})
      .attr("cy",function(d){return projection(d.pos)[1];})
      .on("mouseover", function(d){
                            d3.selectAll("."+d.name.replace(/\s/g, '')).attr("fill","black")
                            displayPathsCurrentPlayer(d.name)
      })
      .on("mouseout",function(d){
                            d3.selectAll("."+d.name.replace(/\s/g, '')).attr("fill","#585858")
          
      });
}

//----------------------------------------------------------------
// launch the map
function displayMap() {
	g.selectAll("path")
	   .data(geoJsonFrance.features)
	   .enter()
	   .append("path")
		 .attr( "fill", "#ccc" )
	   .attr("d", path);
}


// ----------------------------------------------------------------
function displayPathsCurrentPlayer(name){
  list_cities_black=[]
  for(flight in flights){
    if(flight.depart==name.toUpperCase()){
      if(list_cities_black.indexOf(flight.arrivee)<=0){
       list_cities.append(flight.arrivee)
      }
    }
    else{
      if(flight.arrivee==name.toUpperCase()){
        if(list_cities_black.indexOf(flight.depart)<=0){
          list_cities.append(flight.depart)
        }
      }
    }
  }
  for(train in trains){
    if(train.depart==name.toUpperCase()){
      if(list_cities_black.indexOf(train.arrivee)<=0){
        list_cities.append(train.arrivee)
      }
    }
    else{
      if(train.arrivee==name.toUpperCase()){
          if(list_cities_black.indexOf(train.depart)<=0){
            list_cities.append(train.depart)
          }
      }
    }
    
  }
  for(car in cars){
    if(car.depart==name){
      if(list_cities_black.indexOf(car.arrivee.toUpperCase())<=0){
       list_cities.append(car.arrivee.toUpperCase())
      }
    }
    else{
      if(car.arrivee==name){
        if(list_cities_black.indexOf(car.depart.toUpperCase())<=0){
          list_cities.append(car.depart.toUpperCase())
        }
      }
    }
  }
  console.log(list_cities_black)
}

//-----------------------------------------------------------------
function hidePathsCurrentPlayer(){
}



