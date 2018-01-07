//----------------------------------------------------------------
// Auteurs : Renaud, Alice, Mathilde 
// Date : Decembre 2017 
//----------------------------------------------------------------

//compare les trajets en train / avion / voiture
// faire 3 graphes CO2vsTps, CO2vsPrix et TpsvsPrix


// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 350 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%d-%b-%y");




// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svgComparaison = d3.select("#graphe").append( "svg" )
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

creationGraphe();

//----------------------------------------------------------------
//  affiche un svg avec les infos suivantes
//----------------------------------------------------------------
function creationGraphe(){

    // set the ranges
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

// Scale the range of the data
    x.domain([0, 200]);
    y.domain([0, 300]);


    // add the X Axis
    svgComparaison.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the Y Axis
    svgComparaison.append("g")
        .call(d3.axisLeft(y));




}

//----------------------------------------------------------------
// donne le graphique co2vs
//----------------------------------------------------------------
function co2vsTemps(){
    // set the ranges
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

// Scale the range of the data
    x.domain([0, 200]);
    y.domain([0, 300]);


    // add the X Axis
    svgComparaison.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the Y Axis
    svgComparaison.append("g")
        .call(d3.axisLeft(y));




    data = getData();
    console.log(data);
    supprimeSvg();

    // add the dots
    svgComparaison.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("r", 5)
        .attr("cx", function(d) { return x(d.co2); })
        .attr("cy", function(d) { return y(d.prix); })
        .style("fill", function(d) { return d.couleur; });

    legende();
    //TODO
}

//----------------------------------------------------------------
// 
//----------------------------------------------------------------
function prixvsTemps(trajetTrain,trajetAvion,trajetCar){
    //TODO
}

//----------------------------------------------------------------
// 
//----------------------------------------------------------------
function co2vsPrix(trajetTrain,trajetAvion,trajetCar){
     //TODO
}

//----------------------------------------------------------------
// 
//----------------------------------------------------------------
function supprimeSvg(){
    // delete the dots
    svgComparaison.selectAll("circle").remove();
    svgComparaison.selectAll(".legend").remove();
    //TODO

}

function getData(){
    var depart=joueurs.getJoueur(numeroJoueurCourant).position;
    var arrivee=document.getElementById("nomVilleChoisie").value;
    var trajetTrain=trajets.getTrajetEnTrain(depart,arrivee);
    var trajetVoiture=trajets.getTrajetEnVoiture(depart,arrivee);
    var trajetAvion=trajets.getTrajetEnAvion(depart,arrivee);

    var tab = [];
    if (trajetTrain != null) {tab.push(trajetTrain); }
    if (trajetAvion != null) {tab.push(trajetAvion); }
    if (trajetVoiture != null) {tab.push(trajetVoiture); }
    return tab;
}


function legende() {


    // draw legend
    var legend = svgComparaison.selectAll(".legend")
        .data(getData())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    // draw legend colored rectangles
    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function (d) { return d.couleur;} );

    // draw legend text
    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d.legende;})
}
