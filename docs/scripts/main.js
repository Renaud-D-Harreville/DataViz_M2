//----------------------------------------------------------------
// Author : Renaud, Alice, Mathilde 
// Date : December 2017 
// File : main file 
//----------------------------------------------------------------
// get the list of the trains
var trains;
// get the list of the cars
var cars;
// get the list of the flights
var flights;
// get the list of the cities
var cities;

/***
 * Récupération des différentes données nécessaires.
 */
var dataPromise = d3.queue()
    .defer(d3.csv, "./ressources/data/tgv.csv")
    .defer(d3.csv, "./ressources/data/voiture.csv")
    .defer(d3.csv, "./ressources/data/avion.csv")
    .defer(d3.csv, "./ressources/data/villes.csv")
    .await(function(error, tgv, voitures, avion, villes) {
        if (error) {
            console.error('Oh dear, something went wrong: ' + error);
        }
        else {
            trains = tgv;
            cars = voitures;
            flights = avion;
            cities = villes;
            traitementDonnees();
        }
    });



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
    constructor (name, adjs) {
        this.name = name;
        this.villesAdj = adjs || [];
    }
}

class Allvilles {
    constructor() {
        this.villes = []
    }

    addVille(ville) {
        this.villes[ville.name] = ville;
    }

    getVille(name) {
        return this.villes[name] || null;
    }
}

class Trajet {
    constructor(start, end) {
        this.depart = start;
        this.arrivee = end;
        this.type = "";
    }
}

class TrajetVoiture extends Trajet {
    constructor(start, end) {
        super(start, end);
        this.type = "V";
    }
}

class TrajetAvion extends Trajet {
    constructor(start, end) {
        super(start, end);
        this.type = "A";
    }
}


var joueurs = new AllJoueurs();
var villes = new Allvilles();

function traitementDonnees() {

    // Construction des villes à partir du fichier villes.csv
    var tmpVille;
    cities.forEach(function (d) {
        tmpVille = new Ville(d.ville)
        villes.addVille(tmpVille);
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


