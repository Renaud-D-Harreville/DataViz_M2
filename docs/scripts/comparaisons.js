//----------------------------------------------------------------
// Auteurs : Renaud, Alice, Mathilde 
// Date : Decembre 2017 
//----------------------------------------------------------------


// dimensions des graphiques
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 350 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

//----------------------------------------------------------------
//  affiche un svg avec les infos suivantes
//----------------------------------------------------------------
function afficherComparaisons(){
    supprimeSvg();

    co2vsTemps();
    co2vsPrix();
    prixvsTemps();

    legende();
}

//----------------------------------------------------------------
// donne le graphique co2vsTemps
//----------------------------------------------------------------
function co2vsTemps(){
    var data = getData();

    // add the dots
    svgCo2vsTemps.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("r", 5)
        .attr("cx", function(d) { return xCT(d.co2); })
        .attr("cy", function(d) { return yCT(d.getTemps()); })
        .style("fill", function(d) { return d.couleur; });
}

//----------------------------------------------------------------
// 
//----------------------------------------------------------------
function prixvsTemps(){
    var data = getData();

    // add the dots
    svgPrixvsTemps.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("r", 5)
        .attr("cx", function(d) { return xPT(d.prix); })
        .attr("cy", function(d) { return yPT(d.getTemps()); })
        .style("fill", function(d) { return d.couleur; });
}


//----------------------------------------------------------------
// 
//----------------------------------------------------------------
function co2vsPrix(){
    data = getData();

    // add the dots
    svgCo2vsPrix.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("r", 5)
        .attr("cx", function(d) { return xCP(d.co2); })
        .attr("cy", function(d) { return yCP(d.prix); })
        .style("fill", function(d) { return d.couleur; });
}

//----------------------------------------------------------------
// supprime les éléments affichés, afin de mettre à jour l'affichage
//----------------------------------------------------------------
function supprimeSvg(){
    svgCo2vsTemps.selectAll("circle").remove();
    svgCo2vsTemps.selectAll(".legend").remove();

    svgPrixvsTemps.selectAll("circle").remove();
    svgPrixvsTemps.selectAll(".legend").remove();

    svgCo2vsPrix.selectAll("circle").remove();
    svgCo2vsPrix.selectAll(".legend").remove();
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
    var legendCT = svgCo2vsTemps.selectAll(".legend")
        .data(getData())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    // draw legend colored rectangles
    legendCT.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function (d) { return d.couleur;} );

    // draw legend text
    legendCT.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d.legende;});

    // draw legend
    var legendPT = svgPrixvsTemps.selectAll(".legend")
        .data(getData())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    // draw legend colored rectangles
    legendPT.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function (d) { return d.couleur;} );

    // draw legend text
    legendPT.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d.legende;})

    // draw legend
    var legendCP = svgCo2vsPrix.selectAll(".legend")
        .data(getData())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    // draw legend colored rectangles
    legendCP.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function (d) { return d.couleur;} );

    // draw legend text
    legendCP.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d.legende;})
}

/**
 * Construction du graphique 'co2 VS Temps'
 */
//création du svg
var svgCo2vsTemps = d3.select("#co2vsTemps").append( "svg" )
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// définit l'echelle
var xCT = d3.scaleLinear().range([0, width]);
var yCT = d3.scaleLinear().range([height, 0]);


// Scale the range of the data
xCT.domain([0, 250]);
yCT.domain([0, 5]);


// add the X Axis
svgCo2vsTemps.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xCT))
    .append("text")
        .attr("fill", "#000")
        .attr("x", width)
        .attr("y", -12)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Co2 (Kg)");

// add the Y Axis
svgCo2vsTemps.append("g")
    .call(d3.axisLeft(yCT))
    .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Durée (heures)");

/**
 * Construction du graphique 'Prix VS Temps'
 */
//création du svg
var svgPrixvsTemps = d3.select("#prixvsTemps").append( "svg" )
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// définit l'echelle
var xPT = d3.scaleLinear().range([0, width]);
var yPT = d3.scaleLinear().range([height, 0]);

// Scale the range of the data
xPT.domain([0, 250]);
yPT.domain([0, 5]);


// add the X Axis
svgPrixvsTemps.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xPT))
    .append("text")
        .attr("fill", "#000")
        .attr("x", width)
        .attr("y", -12)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Prix (€)");

// add the Y Axis
svgPrixvsTemps.append("g")
    .call(d3.axisLeft(yPT))
    .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Durée (heures)");


/**
 * Construction du graphique 'co2 VS Prix'
 */
//création du svg
var svgCo2vsPrix = d3.select("#co2vsPrix").append( "svg" )
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// définit l'echelle
var xCP = d3.scaleLinear().range([0, width]);
var yCP = d3.scaleLinear().range([height, 0]);

// Scale the range of the data
xCP.domain([0, 250]);
yCP.domain([0, 200]);


// add the X Axis
svgCo2vsPrix.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xCP))
    .append("text")
        .attr("fill", "#000")
        .attr("x", width)
        .attr("y", -12)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Co2 (Kg)");

// add the Y Axis
svgCo2vsPrix.append("g")
    .call(d3.axisLeft(yCP))
    .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Prix (€)");





/**
 * code pour l'affichage des onglets
 */
    $(function() {
        $('#onglets').css('display', 'block');
        $('#onglets').click(function(event) {
            var actuel = event.target;
            if (!/li/i.test(actuel.nodeName) || actuel.className.indexOf('actif') > -1) {
                alert(actuel.nodeName);
                return;
            }
            $(actuel).addClass('actif').siblings().removeClass('actif');
            setDisplay();
        });
        function setDisplay() {
            var modeAffichage;
            $('#onglets li').each(function(rang) {
                modeAffichage = $(this).hasClass('actif') ? '' : 'none';
                $('.item').eq(rang).css('display', modeAffichage);
            });
        }
        setDisplay();
    });



