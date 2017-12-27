//----------------------------------------------------------------
// Author : Renaud, Alice, Mathilde 
// Date : December 2017 
// File : main file 
//----------------------------------------------------------------




/**
 * Création des différentes classes utilisée pour l'application
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

class Joueur {

    constructor(name){
        this.name = name; // name est l'identifiant du joueur.
        this.monnaie = 500; //somme de départ en euros
    }
}

class ActionsJoueur {
    constructor () {

    }
}

class Ville {
    constructor (name) {
        this.name = name.toLowerCase();
        this.villesAdjVoiture =  []; // tableau des villes accessibles (adjacentes) en voiture.
        this.villesAdjTrain =  []; // tableau des villes accessibles (adjacentes) en Train.
        this.villesAdjAvion =  []; // tableau des villes accessibles (adjacentes) en Avion.
    }

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

class TrajetVoiture extends Trajet {
    constructor(start, end) {
        super(start, end);
        this.type = "V";
    }
}

class TrajetTrain extends Trajet {
    constructor(start, end) {
        super(start, end);
        this.type = "T";
    }
}

class TrajetAvion extends Trajet {
    constructor(start, end) {
        super(start, end);
        this.type = "A";
    }
}

/***
 * Récupération des différentes données nécessaires.
 */

// get the list of the trains
var trains;
// get the list of the cars
var cars;
// get the list of the flights
var flights;
// get the list of the cities
var cities;

// la liste des joueurs
var joueurs = new AllJoueurs();
// la liste des villes
var villes = new Allvilles();

var dataPromise = d3.queue()
    .defer(d3.csv, "./ressources/data/tgv.csv")
    .defer(d3.csv, "./ressources/data/voiture.csv")
    .defer(d3.csv, "./ressources/data/avion.csv")
    .defer(d3.csv, "./ressources/data/villes.csv")
    .await(function(error, tgv, voitures, avion, lesVilles) {
        if (error) {
            console.error('Oh dear, something went wrong: ' + error);
        }
        else {
            trains = tgv;
            cars = voitures;
            flights = avion;
            cities = lesVilles;

            let p1 = new Promise(function(resolve, reject) {
                createVilles();
            });
            p1.then(traitementDonnees());
        }
    });



//var essai = new Ville('toto');
//essai.addVilleAdjVoiture(new Trajet("dest", "yolo", "", "", ""));
//console.log(essai);


/**
 * Traitement des données :
 * Instanciation des différents objets depuis les données fournies dans les fichiers.
 */

// Instanciation des villes à partir du fichier villes.csv
function createVilles() {

    var tmpVille;

    cities.forEach(function (d) {
        tmpVille = new Ville(d.ville)
        villes.addVille(tmpVille);
    });
}


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
    console.log(trains);
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

    console.log(villes);

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


