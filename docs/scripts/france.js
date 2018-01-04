//----------------------------------------------------------------
// Auteur : Mathilde 
// Date : Decembre 2017 
// fichier contenant tous les élements pour l'affichage de la carte
//----------------------------------------------------------------

//----------------------------------------------------------------
// crée la div svg 
var largeur = 600, hauteur = 580;
var svg = d3.select( "#carte" )
	.append( "svg" )
	.attr( "width", largeur )
	.attr( "height", hauteur );
var g = svg.append( "g" ); 

//----------------------------------------------------------------
// crée le polygone de la France 
var projection =  d3.geoConicConformal()
					          .center([3.399341, 46.082508])
			            	.scale(2900) 
                    .translate([largeur / 2, hauteur / 2])
var path = d3.geoPath()
			 .projection(projection);


//----------------------------------------------------------------
// Crée la carte avec les noms des villes et les routes
//---------------------------------------------------------------- 

function creationCarte(){
  // création des villes 
  var villesd3 = svg.selectAll(".villes")
      .data(villes.villes)
      .enter();
      
  // labels des villes 
  // id html : nom de la ville sans espace en petit caractère 
  // classes html : nom de la ville sans espace (classe commune label + rond) + "villes" 
    villesd3
      .append("text")
      .attr("class", "villes")
      .attr("id",function(d){return d.nom.replace(/\s/g, '').toUpperCase();})
      .attr("class",function(d){  return d.nom.replace(/\s/g, '');})
      .text(function(d){return d.nom;})
      .attr("font-size", "11px")
      .attr("fill", "#585858")
      .attr("x",function(d){return projection(d.pos)[0];})
      .attr("y",function(d){return projection(d.pos)[1];})
      .on("mouseover", function(d){
                            d3.selectAll("."+d.nom.replace(/\s/g, '')).attr("fill","black")
      })
      .on("mouseout",function(d){
                            d3.selectAll("."+d.nom.replace(/\s/g, '')).attr("fill","#585858")
          
      });

  // rond représentant les villes 
  // classe html : nom de la ville sans espace (classe commune label + rond) 
    villesd3
      .append("circle")
      .attr("r", 3)
      .attr("class",function(d){return d.nom.replace(/\s/g, '');})
      .attr("fill", "#585858")
      .attr("cx",function(d){return projection(d.pos)[0];})
      .attr("cy",function(d){return projection(d.pos)[1];})
      .on("mouseover", function(d){
                            d3.selectAll("."+d.nom.replace(/\s/g, '')).attr("fill","black")
      })
      .on("mouseout",function(d){
                            d3.selectAll("."+d.nom.replace(/\s/g, '')).attr("fill","#585858")
          
      });
}

// TODO faire le onclick de ville 

//----------------------------------------------------------------
// affiche la carte
//----------------------------------------------------------------
function affichageCarte() {
	g.selectAll("path")
	   .data(geoJsonFrance.features)
	   .enter()
	   .append("path")
     .attr("class","france")
  g.selectAll(".france")
		 .attr( "fill", "#ccc" )
	   .attr("d", path);
  dessinerTrajets();

  //exemple
  afficherCheminsAccessiblesDepuisVille("PARIS");
}

//----------------------------------------------------------------
// avec la liste des trajets, affiche la carte 
//----------------------------------------------------------------
function dessinerTrajets(){
    lignes={}
    var dict=trajets.trajetsPossibles();
    for(ville in dict){
      var x1 = d3.select("#"+ville.replace(/\s/g, '')).attr("x");
      var y1 = d3.select("#"+ville.replace(/\s/g, '')).attr("y");
      for( i in dict[ville]){
          var x2 = d3.select("#"+dict[ville][i].replace(/\s/g, '')).attr("x");
          var y2 = d3.select("#"+dict[ville][i].replace(/\s/g, '')).attr("y");
          g.append("line")
              .attr("class","trajets")
              .attr("stroke","#686868")
              .attr("stroke-width","0.5")
              .attr("id",ville.replace(/\s/g, '')+dict[ville][i].replace(/\s/g, ''))
              .attr("x1",x1)
              .attr("y1",y1)
              .attr("x2",x2)
              .attr("y2",y2)
      }
    }
}


//----------------------------------------------------------------
// avec la liste des villes adjacentes, affiche les lignes possibles 
//----------------------------------------------------------------
function afficherCheminsAccessiblesDepuisVille(nom){
  listeVillesAdjacentes=villes.getVille(nom).listeVillesAdjacentes();
  for(i in listeVillesAdjacentes){
    if (listeVillesAdjacentes[i]<nom){
      d3.select("#"+listeVillesAdjacentes[i]+nom.replace(/\s/g, '').toUpperCase())
        .attr("stroke","black")
        .attr("stroke-width","1")
        .attr("class","positionActuelle")
     d3.select("#"+nom.replace(/\s/g,'').toUpperCase())
          .attr("font-weight","bold")
          .attr("fill","black")
          .attr("class","villes_accessibles")
    }
    else{
      d3.select("#"+nom.replace(/\s/g, '').toUpperCase()+listeVillesAdjacentes[i])
         .attr("stroke","black")
         .attr("stroke-width","1")
         .attr("class","positionActuelle")
      d3.select("#"+nom.replace(/\s/g,'').toUpperCase())
          .attr("font-weight","bold")
          .attr("fill","black")
          .attr("class","villes_accessibles")
    }
  }

}

//----------------------------------------------------------------
// retire les trais en noirs
//----------------------------------------------------------------
function retirerCheminsAccessibles(){
  d3.selectAll(".positionActuelle")
    .attr("stroke","#686868")
    .attr("stroke-width","0.5")
    .classed("positionActuelle",false)
  d3.selectAll(".villes_accessibles")
    .attr("font-weight","normal")
    .attr("fill","#585858")
    .classed("villes_accessibles",false)
}


