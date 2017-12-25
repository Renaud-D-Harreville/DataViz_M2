//----------------------------------------------------------------
// Author : Renaud, Alice, Mathilde 
// Date : December 2017 
// File : main file 
//----------------------------------------------------------------
// get the list of the trains
var trains;

//----------------------------------------------------------------
// get the list of the cars 
var cars;

//----------------------------------------------------------------
// get the list of the flights
var flights;

//----------------------------------------------------------------
// get the list of the cities
var cities;

//----------------------------------------------------------------
function loadData(){
	d3.csv("ressources/data/avion.csv", function(data) {
		cities = data;
	});
	d3.csv("ressources/data/avion.csv", function(data) {
		flights = data;
	});
	d3.csv("ressources/data/voiture.csv", function(data) {
		cars = data;
	});
	d3.csv("ressources/data/tgv.csv", function(data) {
  		trains=data
	});
}
loadData();