//----------------------------------------------------------------
// Auteurs : Renaud, Alice, Mathilde 
// Date : Decembre 2017 
//----------------------------------------------------------------

var depart;
var arrivee;
var nombreJoueursMax=3;


//----------------------------------------------------------------
//  initialise le nb de joueurs, toutes données à 0, cache la div formulaire, lance start() 
//----------------------------------------------------------------
function initialisation(){
    document.getElementById("popup").style.display = "none"; 
    document.getElementById("game").style.opacity="1";

    var nombreJoueurs=document.getElementById("selectNombreJoueurs").value;
    console.log(nombreJoueurs)
    console.log(nombreJoueursMax)
    for(var i=parseInt(nombreJoueurs)+1;i<=nombreJoueursMax;i++){
       document.getElementsByClassName("joueur"+i)[0].style.display="none";
    }

}

//----------------------------------------------------------------
//  init le jeu avec les fonctions suivantes , lance (joueur1) 
//----------------------------------------------------------------
function start(){
    //TODO
}

//----------------------------------------------------------------
//  deux villes a au moins 3 chemins d'écart
//----------------------------------------------------------------
function getDepartArrivee(){
    //TODO
}


//----------------------------------------------------------------
// affiche en direct la ville dans le formulaire de réponse au clique
//----------------------------------------------------------------
function completeformulaire(depart,arrivee,joueur){
    //TODO
}

//----------------------------------------------------------------
//  modifie le score, l'historique du joueur
//----------------------------------------------------------------
function jouer(joueur,trajet){
    //TODO
}

//----------------------------------------------------------------
// test si arrivee, si non displayPathsCurrentPlayer(ville); si oui test si finished() si oui displayscores() si non suivant(joueur+1)
//----------------------------------------------------------------
function suivant(numeroJoueur){
    //TODO

}

//----------------------------------------------------------------
// 
//----------------------------------------------------------------
function finished(){
    //TODO

}