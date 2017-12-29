//----------------------------------------------------------------
// Author : Renaud, Alice, Mathilde 
// Date : December 2017 
// File : main file 
//----------------------------------------------------------------




//-------------------------------------------------
//-------------------------------------------------
// Récupération des différentes données nécessaires.
// C'est ici que le code commence vraiment.
//-------------------------------------------------
//-------------------------------------------------


// get the list of the trains
var trains;
// get the list of the cars
var cars;
// get the list of the flights
var flights;
// get the list of the cities
var cities;
// d3 visualisation of the map
var geoJsonFrance;
//

// la liste des joueurs
var joueurs = new AllJoueurs();
// la liste des villes
var villes = new Allvilles();
// Liste des différents trajets sur la France entière
var trajets = new AllTrajets();

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
    .await(function(error, tgv, voitures, avion, franceJson, coordVilles) {
        if (error) {
            console.error('Oh dear, something went wrong: ' + error);
        }
        else {
            trains = tgv;
            cars = voitures;
            flights = avion;
            cities = coordVilles;
            geoJsonFrance = franceJson;
            let p1 = new Promise(function(resolve, reject) {
                createVilles(); });
            p1.then(traitementDonnees());

            let p2 = new Promise(function(resolve, reject) {
                createmap(); });
            p2.then(displayMap());
        }
    });


//----------------------------------------------------------------------------------
// Traitement des données :
// Instanciation des différents objets depuis les données fournies dans les fichiers.
//-----------------------------------------------------------------------------------

/**
 * Instanciation des villes à partir du fichier villes.csv
 */
function createVilles() {

    var tmpVille;
    cities.forEach(function (d) {
        tmpVille = new Ville(d.name, d.pos);
        villes.addVille(tmpVille);
    });
}

/**
 * Instanciation des trajets fournis par les fichiers voitures.csv, tgv.csv et avion.csv
 */
function traitementDonnees() {

    // Instanciation des trajets en voiture, et ajout de ceux ci à leurs villes de depart et d'arrivee.
    var tmpTrajetVoiture;
    cars.forEach(function (c) {
        tmpTrajetVoiture = new TrajetVoiture(c.depart, c.arrivee, c.temps, c.prix, c.CO2);
        villes.getVille(c.depart.toLowerCase()).addVilleAdjVoiture(tmpTrajetVoiture);
        villes.getVille(c.arrivee.toLowerCase()).addVilleAdjVoiture(tmpTrajetVoiture);
        trajets.addTrajet(tmpTrajetVoiture);
    });

    // Instanciation des trajets en train, et ajout de ceux ci à leurs villes de depart et d'arrivee.
    var tmpTrajetTrain;
    trains.forEach(function (t) {
        tmpTrajetTrain = new TrajetTrain(t.depart, t.arrivee, t.temps, t.prix, t.CO2);
        villes.getVille(t.depart.toLowerCase()).addVilleAdjTrain(tmpTrajetTrain);
        villes.getVille(t.arrivee.toLowerCase()).addVilleAdjTrain(tmpTrajetTrain);
        trajets.addTrajet(tmpTrajetTrain);
    });

    // Instanciation des trajets en voiture, et ajout de ceux ci à leurs villes de depart et d'arrivee.
    var tmpTrajetAvion;
    flights.forEach(function (f) {
        tmpTrajetAvion = new TrajetAvion(f.depart, f.arrivee, f.temps, f.prix, f.CO2);
        villes.getVille(f.depart.toLowerCase()).addVilleAdjAvion(tmpTrajetAvion);
        villes.getVille(f.arrivee.toLowerCase()).addVilleAdjAvion(tmpTrajetAvion);
        trajets.addTrajet(tmpTrajetAvion);
    });

    //console.log(villes);


}




/*
//var trains;
d3.csv( "./ressources/data/tgv.csv", function(data) {
  trains=data;
});


//----------------------------------------------------------------
// get the list of the cars 
//var cars;
d3.csv( "./ressources/data/voiture.csv", function(data) {
  cars=data;
});

//----------------------------------------------------------------
// get the list of the flights
//var flights;
d3.csv( "./ressources/data/avion.csv", function(data) {
  flights=data;
});
*/

//----------------------------------------------------------------
// get the list of the cities
//var cities;


