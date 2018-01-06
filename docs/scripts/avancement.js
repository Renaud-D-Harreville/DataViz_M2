//----------------------------------------------------------------
// Auteurs :  Alice
// Date : Decembre 2017 
//----------------------------------------------------------------

//----------------------------------------------------------------
//   creation du svg
//----------------------------------------------------------------
var largeur = 600, hauteur = 580;
var svgScores = d3.select( "#scores" )
    .append( "svg" )
    .attr( "width", largeur )
    .attr( "height", hauteur )
var s = svgScores.append("g");

function miseAjourScores(joueuri, d){
    var scorei = scores.getScore(joueuri.id);
    switch(d.type) {
        case "A": 
            scorei.Aprix = scorei.Aprix + d.prix ;  
            console.log("case A");
            scorei.Aduree = additionHeure(scorei.Aduree, d.duree) ;  
            scorei.Aco2 = scorei.Aco2 + d.co2 ;  
            break;
        case "T":
            scorei.Tprix = scorei.Tprix + d.prix ; 
            console.log("case T"); 
            scorei.Tduree = additionHeure(scorei.Tduree,d.duree) ;  
            scorei.Tco2 = scorei.Tco2 + d.co2 ;              
            break;
        case "V": 
            scorei.Vprix = scorei.Vprix + d.prix ;  
            console.log("case V");
            scorei.Vduree = additionHeure(scorei.Vduree, d.duree) ;  
            scorei.Vco2 = scorei.Vco2 + d.co2 ;  
            break;
        default:
            break;
    }
    return scorei ;    
}


//----------------------------------------------------------------
//  affichage svg à l'initialisation du jeu 
//----------------------------------------------------------------
function affichageSvgScores(){
 
}


//----------------------------------------------------------------
// Modifie les données du svg à chaque tour
//----------------------------------------------------------------
function miseAjourSvg(){
    //TODO
}

//----------------------------------------------------------------
// div en plein milieu de l'écran
//----------------------------------------------------------------
function affichageScores(){
    //TODO
}

//----------------------------------------------------------------
// cache la div
//----------------------------------------------------------------
function cacheScores(){
    //TODO
}


