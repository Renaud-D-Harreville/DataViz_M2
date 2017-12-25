//----------------------------------------------------------------
// Author : Renaud, Alice, Mathilde 
// Date : December 2017 
// File : main file 
//----------------------------------------------------------------
// get the list of the trains
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


