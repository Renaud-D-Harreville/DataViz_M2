//----------------------------------------------------------------
// Auteurs : Renaud, Alice, Mathilde 
// Date : Decembre 2017 
//----------------------------------------------------------------

var depart="PARIS";
var arrivee;
var numeroJoueurCourant;
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

    let p1 = new Promise(function(resolve, reject) {
        // crée les joueurs
        for(var i=1;i<=parseInt(nombreJoueurs);i++){
            var joueur= new Joueur(i,depart);
            joueurs.addJoueur(joueur);
        }
    });

    p1.then(start());

}

//----------------------------------------------------------------
//  init le joueur 1
//----------------------------------------------------------------
function start(){
    document.getElementById("joueur1co2").innerHTML=joueurs.getJoueur(1).co2;
    document.getElementById("joueur1temps").innerHTML=joueurs.getJoueur(1).temps;
    document.getElementById("joueur1prix").innerHTML=joueurs.getJoueur(1).prix;
    afficherCheminsAccessiblesDepuisVille(joueurs.getJoueur(1).position);
    numeroJoueurCourant=1;
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
function completeformulaire(arriveeSelectionnee){
    document.getElementById("nomVilleChoisie").value=arriveeSelectionnee;
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