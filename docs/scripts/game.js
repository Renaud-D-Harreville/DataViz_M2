//----------------------------------------------------------------
// Auteurs : Renaud, Alice, Mathilde 
// Date : Decembre 2017 
//----------------------------------------------------------------

var depart;
var arrivee;
//nombre de div disponible dans la page html
var nombreJoueursMax=3;


//----------------------------------------------------------------
//  initialise le nb de joueurs, toutes données à 0, cache la div formulaire, lance start() 
//----------------------------------------------------------------
function initialisation(){
    // cache la div
    document.getElementById("popup").style.display = "none"; 
    document.getElementById("game").style.opacity="1";

    // garde le bon nombre de div dans la barre de gauche
    var nombreJoueurs=document.getElementById("selectNombreJoueurs").value;
    for(var i=parseInt(nombreJoueurs)+1;i<=nombreJoueursMax;i++){
       document.getElementsByClassName("joueur"+i)[0].style.display="none";
    }

    // crée les joueurs
    for(var i=1;i<=parseInt(nombreJoueurs);i++){
        var joueur= new Joueur(i,null);
        joueurs.addJoueur(joueur);
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