//----------------------------------------------------------------
// Author : Renaud, Alice, Mathilde 
// Date : December 2017 
// File : main file 
//----------------------------------------------------------------


//----------------------------------------------------------------
// Création des différentes classes utilisée pour l'application
//----------------------------------------------------------------

/**
 * Classe contenant la liste des joueurs
 */
class AllJoueurs {

    constructor () {
        this.players = [];
    }

    addPlayer(joueur) {
        this.players[joueur.name] = joueur;
    }

    getJoueur(name) { return this.players[name]; }
}


/**
 * définit un joueur, son placement sur la carte ainsi que ses actions faites au cours du jeu.
 */
class Joueur {

    constructor(name, start){
        this.name = name; // name est l'identifiant du joueur.
        this.monnaie = 500; //somme de départ en euros
        this.start = start || "";
        this.currentPlace = start || "";
        this.actions = [];
    }
}


/**
 * Définit une action faite par un joueur
 */
class ActionsJoueur {
    constructor () {
        //TODO
    }
}

/**
 * Définit une ville par son nom. Pour simplifier, le nom est enregistré en minuscule.
 * Les villes adjacentes (i.e. les villes accessibles depuis l'instance),
 * sont enregistrées dans des tableaux associatifs
 */
class Ville {

    constructor (name) {
        this.name = name.toLowerCase();
        this.villesAdjVoiture =  []; // tableau associatif des villes accessibles (adjacentes) en voiture.
        this.villesAdjTrain =  []; // tableau associatif des villes accessibles (adjacentes) en Train.
        this.villesAdjAvion =  []; // tableau associatif des villes accessibles (adjacentes) en Avion.
    }

    /**
     * Ajoute une ville accessible en voiture
     * @param trajet : le trajet correspondant entre l'instance et la ville accessible.
     */
    addVilleAdjVoiture (trajet) {
        var destination;
        if (trajet.depart.toLowerCase() == this.name)
            { destination = trajet.arrivee; }
        else if (trajet.arrivee.toLowerCase() == this.name)
            { destination = trajet.depart; }
        else
            {return;}
        this.villesAdjVoiture[destination.toLowerCase()] = trajet;

    }

    /**
     * Ajoute une ville accessible en train
     * @param trajet : le trajet correspondant entre l'instance et la ville accessible.
     */
    addVilleAdjTrain (trajet) {
        var destination;
        if (trajet.depart.toLowerCase() == this.name)
            { destination = trajet.arrivee; }
        else if (trajet.arrivee.toLowerCase() == this.name)
            { destination = trajet.depart; }
        else
            {return;}
        this.villesAdjTrain[destination.toLowerCase()] = trajet;

    }

    /**
     * Ajoute une ville accessible en Avion
     * @param trajet : le trajet correspondant entre l'instance et la ville accessible.
     */
    addVilleAdjAvion (trajet) {
        var destination;
        if (trajet.depart.toLowerCase() == this.name)
            { destination = trajet.arrivee; }
        else if (trajet.arrivee.toLowerCase() == this.name)
            { destination = trajet.depart; }
        else
            {return;}
        this.villesAdjAvion[destination.toLowerCase()] = trajet;
    }
}


/**
 * Classe contenant la liste des villes
 */
class Allvilles {
    constructor() {
        this.villes = []
    }

    addVille(ville) {
        this.villes[ville.name.toLowerCase()] = ville;
    }

    getVille(name) {
        return this.villes[name.toLowerCase()] || null;
    }
}

/**
 * Classe définissant un trajet.
 * Un trajet est définit par
 * @property depart : une ville de départ
 * @property arrivee : une ville d'arrivée
 * @property type : le type de trajet ('A' -> Avion, 'T' -> Train, 'V' -> Voiture)
 * @property duree : la durée du trajet
 * @property prix : le prix (€) du trajet
 * @property coutCo2 : le cout en CO2 du trajet.
 */
class Trajet {
    constructor(start, end, duree, prix, coutCo2) {
        this.depart = start.toLowerCase();
        this.arrivee = end.toLowerCase();
        this.type = "";
        this.duree = duree;
        this.prix = prix;
        this.coutCo2 = coutCo2;
    }
}

/**
 * Un trajet en voiture
 */
class TrajetVoiture extends Trajet {
    constructor(start, end) {
        super(start, end);
        this.type = "V";
    }
}

/**
 * Un trajet en train
 */
class TrajetTrain extends Trajet {
    constructor(start, end) {
        super(start, end);
        this.type = "T";
    }
}

/**
 * Un trajet en avion
 */
class TrajetAvion extends Trajet {
    constructor(start, end) {
        super(start, end);
        this.type = "A";
    }
}

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


/**
 * Traitement des données :
 * Instanciation des différents objets depuis les données fournies dans les fichiers.
 */

/**
 * Instanciation des villes à partir du fichier villes.csv
 */
function createVilles() {

    var tmpVille;

    cities.forEach(function (d) {
        tmpVille = new Ville(d.name)
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
    });

    // Instanciation des trajets en train, et ajout de ceux ci à leurs villes de depart et d'arrivee.
    var tmpTrajetTrain;
    trains.forEach(function (t) {
        tmpTrajetTrain = new TrajetTrain(t.depart, t.arrivee, t.temps, t.prix, t.CO2);
        villes.getVille(t.depart.toLowerCase()).addVilleAdjTrain(tmpTrajetTrain);
        villes.getVille(t.arrivee.toLowerCase()).addVilleAdjTrain(tmpTrajetTrain);
    });

    // Instanciation des trajets en voiture, et ajout de ceux ci à leurs villes de depart et d'arrivee.
    var tmpTrajetAvion;
    flights.forEach(function (f) {
        tmpTrajetAvion = new TrajetAvion(f.depart, f.arrivee, f.temps, f.prix, f.CO2);
        villes.getVille(f.depart.toLowerCase()).addVilleAdjAvion(tmpTrajetAvion);
        villes.getVille(f.arrivee.toLowerCase()).addVilleAdjAvion(tmpTrajetAvion);
    });

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


