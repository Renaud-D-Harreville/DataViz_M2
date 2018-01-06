//----------------------------------------------------------------
// Auteurs :  Alice
// Date : Janvier 2018
//----------------------------------------------------------------

//----------------------------------------------------------------
//  création & affichage svg à l'initialisation du jeu 
//----------------------------------------------------------------
largeurSvg = 600 ; hauteurSvg = 300;
var marges = {haut: 20, droite: 50, bas: 30, gauche: 20},
    largeur = largeurSvg - marges.gauche - marges.droite,
    hauteur = hauteurSvg - marges.haut - marges.bas;

var svgScores = d3.select( "#scores" )
    .append( "svg" )
    .attr( "width", largeurSvg )
    .attr( "height", hauteurSvg );
var s = svgScores.append("g")
    .attr("transform", "translate(" + marges.gauche+ "," + marges.haut + ")");

// création des axes
var x = d3.scaleBand()
    .range([0, largeur])
    .padding(0.1);
var y = d3.scaleLinear()
    .range([hauteur,0]);
        
s.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(10,"+hauteur+")")
    .call(d3.axisBottom(x));

s.append("g")
    .attr("class", "axis axis--y")
    .attr("transform", "translate(10,0)")
    .call(d3.axisLeft(y));

var c = ["#C201D8","#88CEF2","#177B0C"];


//----------------------------------------------------------------
// Modifie les données du svg à chaque tour
//----------------------------------------------------------------
function miseAjourSvg(){

    // domaines de définition  
    //y.domain([0, d3.max(data, function(d) { return d.Vprix; })]);

    console.log(scores.scores.length)
    for(i=0; i<scores.scores.length-1;i++){
        var score = scores.getScore(i+1);
        s.append("rect")
            .attr("x", score.id )
            .attr("width", 10)
            .attr("y", score.Vprix)
            .attr("height", score.Vprix)
            .attr("fill", c[score.id]);

    }
}
//----------------------------------------------------------------
// div en plein milieu de l'écran
//----------------------------------------------------------------
function afficheScores(){
    console.log("hover");
    document.getElementById("scores").style.visibility = "visible"; 
}

//----------------------------------------------------------------
// cache la div
//----------------------------------------------------------------
function cacheScores(){
    console.log("out");
    document.getElementById("scores").style.visibility = "hidden";
}

//----------------------------------------------------------------
//   fonction de MàJ des scores à la fin de chaque tour
//----------------------------------------------------------------
function miseAjourScores(joueuri, d){
    var scorei = scores.getScore(joueuri.id);
    switch(d.type) {
        case "A": 
            scorei.Aprix = scorei.Aprix + d.prix ;  
            scorei.Aduree = additionHeure(scorei.Aduree, d.duree) ;  
            scorei.Aco2 = scorei.Aco2 + d.co2 ;  
            break;
        case "T":
            scorei.Tprix = scorei.Tprix + d.prix ; 
            scorei.Tduree = additionHeure(scorei.Tduree,d.duree) ;  
            scorei.Tco2 = scorei.Tco2 + d.co2 ;              
            break;
        case "V": 
            scorei.Vprix = scorei.Vprix + d.prix ;  
            scorei.Vduree = additionHeure(scorei.Vduree, d.duree) ;  
            scorei.Vco2 = scorei.Vco2 + d.co2 ;  
            break;
        default:
            break;
    }
    return scorei ;    
}



