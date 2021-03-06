//----------------------------------------------------------------
// Auteur : Mathilde 
// Date : Decembre 2017 
// fichier contenant tous les élements pour l'affichage de la carte
//----------------------------------------------------------------

//----------------------------------------------------------------
// crée la div svg 
var largeur = 600, hauteur = 580;
var svgFrance = d3.select( "#carte" )
	.append( "svg" )
	.attr( "width", largeur )
	.attr( "height", hauteur );
var g = svgFrance.append("g");

//----------------------------------------------------------------
// crée le polygone de la France 
var projection =  d3.geoConicConformal()
					          .center([3.399341, 46.082508])
			            	.scale(2900) 
                    .translate([largeur / 2, hauteur / 2]);
var path = d3.geoPath()
			 .projection(projection);

var tooltipVille = svgFrance.append("rect")	
    .attr("fill","#4caf50")
    .attr("position","relative")
    .attr("rx", 8)
    .attr("height",20);

//----------------------------------------------------------------
// Crée la carte avec les noms des villes et les routes
//---------------------------------------------------------------- 

function creationCarte(){
  // création des villes 
  var villesd3 = svgFrance.selectAll(".villes")
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
      .attr("x",function(d){return projection(d.pos)[0]-15;})
      .attr("y",function(d){ if(d.nom =="LYON"){
                                return projection(d.pos)[1]-15;
                            }
                            else{
                                  return projection(d.pos)[1]-5;}
      });

  // rond représentant les villes 
  // classe html : nom de la ville sans espace (classe commune label + rond) 
    villesd3
      .append("circle")
      .attr("r", 3)
      .attr("id",function(d){return "rond"+d.nom.replace(/\s/g, '');})
      .attr("class",function(d){return d.nom.replace(/\s/g, '');})
      .attr("fill", "#585858")
      .attr("cx",function(d){return projection(d.pos)[0];})
      .attr("cy",function(d){return projection(d.pos)[1];});
    
}

//----------------------------------------------------------------
// affiche la carte
//----------------------------------------------------------------
function affichageCarte() {
	g.selectAll("path")
	   .data(geoJsonFrance.features)
	   .enter()
	   .append("path")
     .attr("class","france");
  g.selectAll(".france")
		 .attr( "fill", "#cfd8dc" )
	   .attr("d", path);
  dessinerTrajets();
}

//----------------------------------------------------------------
// avec la liste des trajets, affiche la carte 
//----------------------------------------------------------------
function dessinerTrajets(){
    lignes={}
    var dict=trajets.trajetsPossibles();
    for(ville in dict){
      var x1 = d3.select("#rond"+ville.replace(/\s/g, '')).attr("cx");
      var y1 = d3.select("#rond"+ville.replace(/\s/g, '')).attr("cy");
      for( i in dict[ville]){
          var x2 = d3.select("#rond"+dict[ville][i].replace(/\s/g, '')).attr("cx");
          var y2 = d3.select("#rond"+dict[ville][i].replace(/\s/g, '')).attr("cy");
          g.append("line")
              .attr("class","trajets")
              .attr("stroke","#90a4ae")
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
  d3.selectAll("."+nom.replace(/\s/g,'').toUpperCase())
    .attr("font-weight","bold")
    .attr("class","villeCourrante "+nom.replace(/\s/g,'').toUpperCase());

  d3.selectAll("#rond"+nom.replace(/\s/g,'').toUpperCase())
      .attr("r",6)
      .attr("fill",couleurs[numeroJoueurCourant]);

  for(i in listeVillesAdjacentes){
    if(listeVillesAdjacentes[i]!=undefined){
        if (listeVillesAdjacentes[i]<nom){
          d3.select("#"+listeVillesAdjacentes[i].replace(/\s/g, '')+nom.replace(/\s/g, '').toUpperCase())
            .attr("stroke","#388e3c")
            .attr("stroke-width","1.3")
            .attr("class","lignesActuelles")
        }
        else{
          d3.select("#"+nom.replace(/\s/g, '').toUpperCase()+listeVillesAdjacentes[i].replace(/\s/g, ''))
            .attr("stroke","#388e3c")
            .attr("stroke-width","1.3")
            .attr("class","lignesActuelles")
        }
        d3.select("."+listeVillesAdjacentes[i].replace(/\s/g,'').toUpperCase())
          .attr("font-weight","bold")
          .attr("class","villes_accessibles "+listeVillesAdjacentes[i].replace(/\s/g,'').toUpperCase())
    }
  }                     
  var accessibles = svgFrance.selectAll(".villes_accessibles")
                      .on("mouseover", function(d){
                                            d3.selectAll("."+d.nom.replace(/\s/g, '')).attr("fill","#388e3c");
                                            d3.selectAll("#"+d.nom.replace(/\s/g, ''))
                                                .attr("fill","white");
                                            tooltipVille.attr("x",projection(d.pos)[0]-20)
                                                        .attr("y",function(){
                                                                if(d.nom =="LYON"){
                                                                    return projection(d.pos)[1]-30;
                                                                }
                                                                else{
                                                                    return projection(d.pos)[1]-20;
                                                                  }
                                                        })
                                                        .attr("width",8.5*d.nom.length)
                                                        .style("opacity",1);
                                            d3.select(this).style("cursor", "pointer");
                      })
                      .on("mouseout",function(d){
                                            d3.selectAll("."+d.nom.replace(/\s/g, '')).attr("fill","#585858");
                                            d3.selectAll("#"+d.nom.replace(/\s/g, ''))
                                                .attr("fill","#585858");
                                            tooltipVille.style("opacity",0);
                                            colorieDepartArrive();
                                            d3.select(this).style("cursor", "default");
                          
                      })
                      .on("click",function(d){
                         completeformulaire(d.nom);
                         colorieDepartArrive()
                      });


}

//----------------------------------------------------------------
// retire les traits en noirs
//----------------------------------------------------------------
function retirerCheminsAccessibles(){
  d3.selectAll(".lignesActuelles")
    .attr("stroke","#90a4ae")
    .attr("stroke-width","0.5");
  d3.selectAll(".lignesActuelles").classed("lignesActuelles",false);
  d3.selectAll(".villes_accessibles")
    .attr("font-weight","normal")
    .attr("fill","#585858")
    .on("mouseover", null)
    .on("click",null)
    .on("mouseout",null);
  $(".villes_accessibles").removeClass("villes_accessibles");
  d3.selectAll(".villes_accessibles").classed("villes_accessibles",false);
  d3.selectAll(".villeCourrante")
    .attr("fill","#585858")
    .attr("font-weight","normal");
  d3.selectAll(".villeCourrante")
    .attr("r",3)
    .attr("fill","#585858");
  d3.selectAll(".villeCourrante").classed("villeCourrante",false);

}


function colorieDepartArrive(){
  d3.select("#"+depart.replace(/\s/g, ''))
    .attr("font-weight","bold")
    .attr("fill","black");
  d3.select("#"+arrivee.replace(/\s/g, ''))
    .attr("font-size", "13px")
    .attr("font-weight","bold")
    .attr("fill","green");
}