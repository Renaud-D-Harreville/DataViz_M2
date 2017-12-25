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
                            hidePathsCurrentPlayer()
          
      });
  //-------------------------------------------------------------
  // circles of the cities 
    city_labels
      .append("circle")
      .attr("r", 3)
      .attr("class",function(d){return d.name.replace(/\s/g, '');})
      .attr("id",function(d){return d.name.replace(/\s/g, '').toUpperCase();})
      .attr("fill", "#585858")
      .attr("cx",function(d){return projection(d.pos)[0];})
      .attr("cy",function(d){return projection(d.pos)[1];})
      .on("mouseover", function(d){
                            d3.selectAll("."+d.name.replace(/\s/g, '')).attr("fill","black")
                            displayPathsCurrentPlayer(d.name)
      })
      .on("mouseout",function(d){
                            d3.selectAll("."+d.name.replace(/\s/g, '')).attr("fill","#585858")
                            hidePathsCurrentPlayer()
          
      });

      
}

//----------------------------------------------------------------
// launch the map
function displayMap() {
	g.selectAll("path")
	   .data(geoJsonFrance.features)
	   .enter()
	   .append("path")
     .attr("class","map")
  g.selectAll(".map")
		 .attr( "fill", "#ccc" )
	   .attr("d", path);
  drawlines();
}


// ----------------------------------------------------------------
function displayPathsCurrentPlayer(name){
  listCities=getPossibleCitiesInBlack(name);
  for(i in listCities){
    if (listCities[i]<name){
      d3.select("#"+listCities[i]+name.replace(/\s/g, '').toUpperCase())
        .attr("stroke","black")
        .attr("stroke-width","1")
        .attr("class","current")
    }
    else{
      d3.select("#"+name.replace(/\s/g, '').toUpperCase()+listCities[i])
         .attr("stroke","black")
         .attr("stroke-width","1")
         .attr("class","current")
    }
  }

}

//-----------------------------------------------------------------
function hidePathsCurrentPlayer(){
  d3.selectAll(".current")
    .attr("stroke","#626262")
    .attr("stroke-width","0.5")
    .classed("current",false)

}

function drawlines(){
  lines={}
  var dict=getPossibleCitiesInGray()
  console.log(dict)
  for(city in dict){
    var x1 = d3.select("#"+city.replace(/\s/g, '')).attr("cx");
    var y1 = d3.select("#"+city.replace(/\s/g, '')).attr("cy");
    for( i in dict[city]){
      var x2 = d3.select("#"+dict[city][i].replace(/\s/g, '')).attr("cx");
      var y2 = d3.select("#"+dict[city][i].replace(/\s/g, '')).attr("cy");
      g.append("line")
        .attr("class","allLines")
        .attr("stroke","#626262")
        .attr("stroke-width","0.5")
        .attr("id",city.replace(/\s/g, '')+dict[city][i].replace(/\s/g, ''))
        .attr("x1",x1)
        .attr("y1",y1)
        .attr("x2",x2)
        .attr("y2",y2)
    }
  }
}

//----------------------------------------------------------------
function getPossibleCitiesInGray(){
   dict={}
   for(i in flights){
     if( flights[i].depart<flights[i].arrivee ){
       // si on a deja dans le dict 
       if(dict[flights[i].depart]!=undefined){
         // mais pas dans la liste 
         if(dict[flights[i].depart].indexOf(flights[i].arrivee)<=0){
         // on ajoute 
           dict[flights[i].depart].push(flights[i].arrivee)
         }
       }
       else{
         dict[flights[i].depart]=[]
         dict[flights[i].depart].push(flights[i].arrivee)
       }
     }
     else{
      // si on a deja dans le dict 
      if(dict[flights[i].arrivee]!=undefined){
        // mais pas dans la liste 
        if(dict[flights[i].arrivee].indexOf(flights[i].depart)<=0){
        // on ajoute 
          dict[flights[i].arrivee].push(flights[i].depart)
        }
      }
      else{
        dict[flights[i].arrivee]=[]
        dict[flights[i].arrivee].push(flights[i].depart)
      }
    } 
   }
  for(i in trains){
     if( trains[i].depart<trains[i].arrivee ){
       // si on a deja dans le dict 
       if(dict[trains[i].depart]!=undefined){
         // mais pas dans la liste 
         if(dict[trains[i].depart].indexOf(trains[i].arrivee)<=0){
         // on ajoute 
           dict[trains[i].depart].push(trains[i].arrivee)
         }
       }
       else{
         dict[trains[i].depart]=[]
         dict[trains[i].depart].push(trains[i].arrivee)
       }
     }
     else{
      // si on a deja dans le dict 
      if(dict[trains[i].arrivee]!=undefined){
        // mais pas dans la liste 
        if(dict[trains[i].arrivee].indexOf(trains[i].depart)<=0){
        // on ajoute 
          dict[trains[i].arrivee].push(trains[i].depart)
        }
      }
      else{
        dict[trains[i].arrivee]=[]
        dict[trains[i].arrivee].push(trains[i].depart)
      }
    } 
   }
  for(var i=0;i<cars.length;i++){
     if( cars[i].depart.toUpperCase()<cars[i].arrivee.toUpperCase() ){
       // si on a deja dans le dict 
       if(dict[cars[i].depart.toUpperCase()]!=undefined){
         // mais pas dans la liste 
         if(dict[cars[i].depart.toUpperCase()].indexOf(cars[i].arrivee.toUpperCase())<=0){
         // on ajoute 
           dict[cars[i].depart.toUpperCase()].push(cars[i].arrivee.toUpperCase())
         }
       }
       else{
         dict[cars[i].depart.toUpperCase()]=[]
         dict[cars[i].depart.toUpperCase()].push(cars[i].arrivee.toUpperCase())
       }
     }
     else{
      // si on a deja dans le dict 
      if(dict[cars[i].arrivee.toUpperCase()]!=undefined){
        // mais pas dans la liste 
        if(dict[cars[i].arrivee.toUpperCase()].indexOf(cars[i].depart.toUpperCase())<=0){
        // on ajoute 
          dict[cars[i].arrivee.toUpperCase()].push(cars[i].depart.toUpperCase())
        }
      }
      else{
        dict[cars[i].arrivee.toUpperCase()]=[]
        dict[cars[i].arrivee.toUpperCase()].push(cars[i].depart.toUpperCase())
      }
    } 
   }
   delete dict["undefined"]
   return (dict)

}
//-----------------------------------------------------------------
function getPossibleCitiesInBlack(name){
  list_cities_black=[]
  for(i in flights){
    if(flights[i].depart==name.toUpperCase()){
      if(list_cities_black.indexOf(flights[i].arrivee)<=0){
       list_cities_black.push(flights[i].arrivee)
      }
    }
    else{
      if(flights[i].arrivee==name.toUpperCase()){
        if(list_cities_black.indexOf(flights[i].depart)<=0){
          list_cities_black.push(flights[i].depart)
        }
      }
    }
  }
  for(i in trains){
    if(trains[i].depart==name.toUpperCase()){
      if(list_cities_black.indexOf(trains[i].arrivee)<=0){
        list_cities_black.push(trains[i].arrivee)
      }
    }
    else{
      if(trains[i].arrivee==name.toUpperCase()){
          if(list_cities_black.indexOf(trains[i].depart)<=0){
            list_cities_black.push(trains[i].depart)
          }
      }
    }
    
  }
  for(i in cars){
    if(cars[i].depart==name){
      if(list_cities_black.indexOf(cars[i].arrivee.toUpperCase())<=0){
       list_cities_black.push(cars[i].arrivee.toUpperCase())
      }
    }
    else{
      if(cars[i].arrivee==name){
        if(list_cities_black.indexOf(cars[i].depart.toUpperCase())<=0){
          list_cities_black.push(cars[i].depart.toUpperCase())
        }
      }
    }
  }
  return list_cities_black;
}


