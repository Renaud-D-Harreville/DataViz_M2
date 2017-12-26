//----------------------------------------------------------------
// Author : Renaud, Alice, Mathilde 
// Date : December 2017 
// File : main file 
//----------------------------------------------------------------
// get the list of the trains

d3.queue()
    .defer(d3.json, "acteurs_simple2.json")
    .defer(d3.json, "scrutins.json")
    .await(function(error, act, scrut) {
    if (error) {
      console.error('Oh dear, something went wrong: ' + error);
    }
    else {
      scrutins = scrut.scrutins.scrutin
      acteurs = act.export;
      traitementDonnees();
    }
  });  

var trains;
d3.csv( "./ressources/data/tgv.csv", function(data) {
  trains=data;
});


//----------------------------------------------------------------
// get the list of the cars 
var cars;
d3.csv( "./ressources/data/voiture.csv", function(data) {
  cars=data;
});

//----------------------------------------------------------------
// get the list of the flights
var flights;
d3.csv( "./ressources/data/avion.csv", function(data) {
  flights=data;
});

//----------------------------------------------------------------
// get the list of the cities
var cities;


