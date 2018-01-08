//----------------------------------------------------------------
// Auteurs : Renaud, Alice, Mathilde 
// Date : Decembre 2017 
//----------------------------------------------------------------

initVille = choixVilles();
var depart= initVille[0];
var arrivee= initVille[1];

var numeroJoueurCourant;
var trajetCourant;
//nombre de div disponible dans la page html
var nombreJoueursMax=4;

var couleurs = ["","#FFC300","#f31506","#3352ff"," #8915b5"]

//----------------------------------------------------------------
//  choix aléatoire des villes de départ et d'arrivée 
//----------------------------------------------------------------
function choixVilles(){
    var depart= "MARSEILLE";
    var arrivee="RENNES";

    // choix de la ville de départ
    var i = Math.floor((Math.random() * 10) + 1);
    //var depart = villes.getVilleByIndex(i);

    // choix d'une ville à distance >= 3 

    // liste de toutes les villes -> supprimer à chaque fois qu'elle est adjacente
    //var villesArrivee = villes.getVilles(); 
    //var voisin1 = villes.getVille("PARIS").listeVillesAdjacentes();
   
    //faire pour distance 1, 2 et 3 
    return [depart,arrivee];
}


//----------------------------------------------------------------
//  initialise le nb de joueurs, toutes données à 0, cache la div formulaire, lance start() 
//----------------------------------------------------------------
function initialisation(){
    // cache la div
    document.getElementById("popup").style.display = "none"; 
    document.getElementById("game").style.opacity="1";

    document.getElementById("popupfin").style.visibility = "hidden";

    // garde le bon nombre de div dans la barre de gauche
    var nombreJoueurs=document.getElementById("selectNombreJoueurs").value;
    for(var i=parseInt(nombreJoueurs)+1;i<=nombreJoueursMax;i++){
       document.getElementsByClassName("joueur"+i)[0].style.display="none";
    }

    let p1 = new Promise(function(resolve, reject) {
        // crée les joueurs et les scores 
        for(var i=1;i<=parseInt(nombreJoueurs);i++){
            var joueur= new Joueur(i,depart);
            var score = new Score(i);
            joueurs.addJoueur(joueur);
            scores.addScore(score);
            document.getElementById("joueur"+i+"icone").style.color=couleurs[i];
        }
        creationAxesSvg();
    });
    p1.then(start());
}

//----------------------------------------------------------------
//  Pour lancer une nouvelle partie : afficher popup du départ 
//----------------------------------------------------------------
function rejouer(){
    console.log("rejouer");
    //TODO 
    // cacher div popupfin, cacher scores, afficher popup
    document.getElementById("popup").display = "initial";
    document.getElementById("popupfin").visibility = "hidden";
    document.getElementById("scores").display = "none";
    document.getElementById("iconescores").visibility = "visible";
    
}

//----------------------------------------------------------------
//  init le joueur 1
//----------------------------------------------------------------
function start(){
    document.getElementById("joueur1co2").innerHTML=joueurs.getJoueur(1).co2;
    document.getElementById("joueur1temps").innerHTML=joueurs.getJoueur(1).temps;
    document.getElementById("joueur1prix").innerHTML=joueurs.getJoueur(1).prix;
    numeroJoueurCourant=1;
    afficherCheminsAccessiblesDepuisVille(joueurs.getJoueur(1).position);
    colorieDepartArrive();
    annonceJoueurSuivant(1);
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

    afficherComparaisons(); // à modifier

    // si un bouton radio est déjà là, afficher le trajet 
    var radios = document.getElementsByName('moyenTransport');
    for(x = 0; x < radios.length; x++){
       if (radios[x].checked){
           var id=radios[x].id;
            switch(id) {
            case "train":
               completeDataFormTrain();
                break;
            case "avion":
                completeDataFormAvion();
                break;
            case "voiture":
                completeDataFormVoiture();
                break;
            default:
                break;
        }           
       } 
    }
}

//----------------------------------------------------------------
// cherche le trajet en train et appelle afficheTrajet
//----------------------------------------------------------------
function completeDataFormTrain(){
    var depart=joueurs.getJoueur(numeroJoueurCourant).position;
    var arrivee=document.getElementById("nomVilleChoisie").value;
    var trajet=trajets.getTrajetEnTrain(depart,arrivee);
    afficheTrajet(trajet);
}

//----------------------------------------------------------------
// cherche le trajet en voiture et appelle afficheTrajet
//----------------------------------------------------------------
function completeDataFormVoiture(){
    var depart=joueurs.getJoueur(numeroJoueurCourant).position;
    var arrivee=document.getElementById("nomVilleChoisie").value;
    var trajet=trajets.getTrajetEnVoiture(depart,arrivee);
    afficheTrajet(trajet);
}

//----------------------------------------------------------------
// cherche le trajet en avion et appelle afficheTrajet
//----------------------------------------------------------------
function completeDataFormAvion(){
    var depart=joueurs.getJoueur(numeroJoueurCourant).position;
    var arrivee=document.getElementById("nomVilleChoisie").value;
    var trajet=trajets.getTrajetEnAvion(depart,arrivee);
    afficheTrajet(trajet);
}

//----------------------------------------------------------------
// complete co2, temps, prix
//----------------------------------------------------------------
function afficheTrajet(trajet){
    if(trajet==null){
        document.getElementById("infostrajet").style.display="none";
        document.getElementById("reponseTransport").style.display="block";
    }
    else{
        document.getElementById("infostrajet").style.display="block";
        document.getElementById("reponseTransport").style.display="none";
        document.getElementById("trajetco2").innerHTML=trajet.co2;
        document.getElementById("trajetprix").innerHTML=trajet.prix;
        document.getElementById("trajettemps").innerHTML=trajet.duree;
    }
    trajetCourant=trajet;
}

//----------------------------------------------------------------
//  modifie le score, l'historique du joueur
//----------------------------------------------------------------
function jouer(){
    if(trajetCourant !=undefined){
        joueurs.getJoueur(numeroJoueurCourant).position=document.getElementById("nomVilleChoisie").value;
        joueurs.getJoueur(numeroJoueurCourant).actions.push(trajetCourant);
        joueurs.getJoueur(numeroJoueurCourant).temps=additionHeure(joueurs.getJoueur(numeroJoueurCourant).temps,document.getElementById("trajettemps").innerHTML);
        joueurs.getJoueur(numeroJoueurCourant).prix+=parseFloat(document.getElementById("trajetprix").innerHTML);
        joueurs.getJoueur(numeroJoueurCourant).co2+=parseFloat(document.getElementById("trajetco2").innerHTML);
        miseAjourScores(joueurs.getJoueur(numeroJoueurCourant), trajetCourant);
        miseAjourSvg();
        document.getElementById("joueur"+numeroJoueurCourant+"prix").innerHTML=joueurs.getJoueur(numeroJoueurCourant).prix;
        document.getElementById("joueur"+numeroJoueurCourant+"co2").innerHTML=joueurs.getJoueur(numeroJoueurCourant).co2;
        document.getElementById("joueur"+numeroJoueurCourant+"temps").innerHTML=joueurs.getJoueur(numeroJoueurCourant).temps;
        if(joueurs.getJoueur(numeroJoueurCourant).position==arrivee){
            annonceGagnant(numeroJoueurCourant);
            var num=numeroSuivant(numeroJoueurCourant);
            setTimeout(suivant,4000,num);
        }
        else{
             suivant(numeroSuivant(numeroJoueurCourant));
        }
    }
}

//----------------------------------------------------------------
// test si arrivee, si non afficherCheminsAccessiblesDepuisVille(ville); si oui test si finished() si oui displayscores() si non suivant(joueur+1)
//----------------------------------------------------------------
function suivant(numeroJoueur){
    if(joueurs.getJoueur(numeroJoueur).position!=arrivee){
        annonceJoueurSuivant(numeroJoueur);
        $('.collapsible').collapsible('open', numeroJoueurCourant-1);
        numeroJoueurCourant=numeroJoueur;
        retirerCheminsAccessibles();
        $('.collapsible').collapsible('open', numeroJoueur-1);
        document.getElementById("joueur"+numeroJoueurCourant+"prix").innerHTML=joueurs.getJoueur(numeroJoueurCourant).prix;
        document.getElementById("joueur"+numeroJoueurCourant+"co2").innerHTML=joueurs.getJoueur(numeroJoueurCourant).co2;
        document.getElementById("joueur"+numeroJoueurCourant+"temps").innerHTML=joueurs.getJoueur(numeroJoueurCourant).temps;
        afficherCheminsAccessiblesDepuisVille(joueurs.getJoueur(numeroJoueur).position);
        colorieDepartArrive();
    }
    else{
        if(finished()){
            document.getElementById("drop").click();
            
        }
        else{
            suivant(numeroSuivant(numeroJoueur));
        }
    }

}

//----------------------------------------------------------------
// indique que la partie est finie
//----------------------------------------------------------------
function finished(){
    for( i in joueurs.joueurs){
        if(joueurs.getJoueur(i).position!=arrivee){
            return false;
        }
    }
    return true;
}

//----------------------------------------------------------------
// fait l'addition des heures minutes
//----------------------------------------------------------------
function additionHeure(heure1,heure2){
    console.log(heure1)
    var h1=parseInt(heure1.split("h")[0]);
    var h2=parseInt(heure2.split("h")[0]);
    var mins1=parseInt(heure1.split("h")[1]);
    var mins2=parseInt(heure2.split("h")[1]);
    if((mins1+mins2)>60){
        var mins=(mins1+mins2)%60;
        var h=h1+h2+1;
    }
    else{
        var mins=(mins1+mins2);
        var h=h1+h2;
    }
    return h+"h"+mins;
}

//----------------------------------------------------------------
// un modulo un peu spécial pour avoir le numero du joueur suivant
//----------------------------------------------------------------
function numeroSuivant(num) {
    if((num+1)%(joueurs.joueurs.length-1) == 0){
        return joueurs.joueurs.length-1;
    }
    else {
        return (num+1)%(joueurs.joueurs.length-1) ;
    }
}


function annonceJoueurSuivant(numeroJoueur){
    document.getElementById("numeroJoueurPopup").innerHTML=numeroJoueur;
    var div=document.getElementById("nouveauJoueurPopup");
    document.getElementById("nouveauJoueurCard").style.backgroundColor=couleurs[numeroJoueur];
    var div=$("#nouveauJoueurPopup");
    setTimeout(afficheDivAnnimee,1000,div);
}

function annonceGagnant(numeroJoueur){
    document.getElementById("numeroGagnantPopup").innerHTML=numeroJoueur;
    var div=document.getElementById("gagnerJoueurPopup");
    document.getElementById("gagnerJoueurCard").style.backgroundColor=couleurs[numeroJoueur];
    var div=$("#gagnerJoueurPopup");
    setTimeout(afficheDivAnnimee,1000,div);
}

function afficheDivAnnimee(target) {
  target.animate({
    opacity: "+=0.9"
  }, 2000, function() {
    setTimeout(function(){
        target.animate({
            opacity:"0"
        },1000)
    },1000)
  });
}