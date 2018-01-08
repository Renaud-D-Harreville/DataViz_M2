//----------------------------------------------------------------
// Auteurs : Renaud, Alice, Mathilde 
// Date : Decembre 2017 
//----------------------------------------------------------------


//-------------------------------------------------
//-------------------------------------------------
// Récupération des différentes données nécessaires.
// C'est ici que le code commence vraiment.
//-------------------------------------------------
//-------------------------------------------------

// d3 coordonnées de la France
var geoJsonFrance;
// la liste des joueurs
var joueurs = new Joueurs();
// la liste des scores 
var scores = new Scores();
// la liste des villes
var villes = new Villes();
// Liste des différents trajets sur la France entière
var trajets = new Trajets();

//----------------------------------------------------------
// C'est ici que tout le code commence !
//----------------------------------------------------------

/**
 * Récupération des données des différents fichiers en entrée.
 * Puis début de l'éxécution du script.
 */
var dataPromise = d3.queue()
    .defer(d3.csv, "./ressources/data/tgv.csv")
    .defer(d3.csv, "./ressources/data/voiture.csv")
    .defer(d3.csv, "./ressources/data/avion.csv")
    .defer(d3.json, "ressources/data/france.json")
    .defer(d3.json, "ressources/data/coordVilles.json")
    .await(function(error, tgv, voitures, avions, franceJson, villesJson) {
        if (error) {
            console.error('Oh dear, something went wrong: ' + error);
        }
        else {
            geoJsonFrance = franceJson;
            let p1 = new Promise(function(resolve, reject) {
                creationVilles(villesJson); });
            p1.then(traitementDonnees(tgv,voitures,avions));

            let p2 = new Promise(function(resolve, reject) {
                creationCarte(); });
            p2.then(affichageCarte());
        }
    });

$('.dropdown-button').dropdown({
    hover: true,
    constrainWidth : false, 
});


//----------------------------------------------------------------------------------
// Traitement des données :
// Instanciation des différents objets depuis les données fournies dans les fichiers.
//-----------------------------------------------------------------------------------

/**
 * Instanciation des villes à partir du fichier villes.csv
 */
function creationVilles(villesJson) {
    var tmpVille;
    villesJson.forEach(function (d) {
        tmpVille = new Ville(d.name, d.pos);
        villes.addVille(tmpVille);
    });
}

/**
 * Instanciation des trajets fournis par les fichiers voitures.csv, tgv.csv et avion.csv
 */
function traitementDonnees(trains,voitures,avions) {
    // Instanciation des trajets en voiture, et ajout de ceux ci à leurs villes de depart et d'arrivee.
    var tmpTrajetVoiture;
    voitures.forEach(function (c) {
        tmpTrajetVoiture = new TrajetVoiture(c.depart, c.arrivee, c.temps, c.prix, c.CO2);
        villes.getVille(c.depart.toUpperCase()).addVilleAdjVoiture(tmpTrajetVoiture);
        villes.getVille(c.arrivee.toUpperCase()).addVilleAdjVoiture(tmpTrajetVoiture);
        trajets.addTrajet(tmpTrajetVoiture);
    });
    
    // Instanciation des trajets en train, et ajout de ceux ci à leurs villes de depart et d'arrivee.
    var tmpTrajetTrain;
    trains.forEach(function (t) {
        tmpTrajetTrain = new TrajetTrain(t.depart, t.arrivee, t.temps, t.prix, t.CO2);
        villes.getVille(t.depart.toUpperCase()).addVilleAdjTrain(tmpTrajetTrain);
        villes.getVille(t.arrivee.toUpperCase()).addVilleAdjTrain(tmpTrajetTrain);
        trajets.addTrajet(tmpTrajetTrain);
    });

    // Instanciation des trajets en voiture, et ajout de ceux ci à leurs villes de depart et d'arrivee.
    var tmpTrajetAvion;
    avions.forEach(function (f) {
        tmpTrajetAvion = new TrajetAvion(f.depart, f.arrivee, f.temps, f.prix, f.CO2);
        villes.getVille(f.depart.toUpperCase()).addVilleAdjAvion(tmpTrajetAvion);
        villes.getVille(f.arrivee.toUpperCase()).addVilleAdjAvion(tmpTrajetAvion);
        trajets.addTrajet(tmpTrajetAvion);
    });

}

