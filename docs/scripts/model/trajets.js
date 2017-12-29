//----------------------------------------------------------------
// Description des classes concernant les trajets.
//----------------------------------------------------------------



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

    afficherTrajet() {
            d3.select(this.getIdTrajet())
                .attr("stroke","black")
                .attr("stroke-width","1")
                .attr("class","current");
            d3.select("#"+this.arrivee.toUpperCase())
                .attr("font-weight","bold")
                .attr("fill","#ff2e43")
                .attr("class","current_available")
    }

    /**
     * renvoie l'id HTML du trajet dans le DOM
     * @returns {string}
     */
    getIdTrajet() {
        if (this.depart<this.arrivee){
            return "#"+(this.depart+this.arrivee).toUpperCase();
        }
        else {
            return "#"+(this.arrivee+this.depart).toUpperCase();
        }
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

/**
 * Classe contenant tous les trajets. Ils sont organisés par type.
 */
class AllTrajets {
    constructor() {
        this.trajetsVoiture = [];
        this.trajetsTrain = [];
        this.trajetsAvion = [];
    }

    addTrajet(trajet) {
        switch(trajet.type) {
            case "V":
                this.trajetsVoiture.push(trajet);
                break;
            case "T":
                this.trajetsTrain.push(trajet);
                break;
            case "A":
                this.trajetsAvion.push(trajet);
                break;
            default:
                break;
        }
    }

    getAllTrajets() {
        return this.trajetsAvion
            .concat(this.trajetsTrain)
            .concat(this.trajetsVoiture);
    }

    displayVoitures(svg, villes, projection) {
        trajets.trajetsVoiture.forEach(function (d) {
            svg.append("line")
                .attr("class","allLines")
                .attr("stroke","#686868")
                .attr("stroke-width","0.5")
                .attr("id",city.replace(/\s/g, '')+dict[city][i].replace(/\s/g, ''))
                .attr("x1", villes.getVille(d.depart).getX(projection))
                .attr("y1",villes.getVille(d.depart).getY(projection))
                .attr("x2",villes.getVille(d.arrivee).getX(projection))
                .attr("y2",villes.getVille(d.arrivee).getY(projection))
        });
    }

    displayTrains(svg, villes, projection) {
        trajets.trajetsTrain.forEach(function (d) {
            svg.append("line")
                .attr("class","allLines")
                .attr("stroke","#686868")
                .attr("stroke-width","0.5")
                .attr("id",city.replace(/\s/g, '')+dict[city][i].replace(/\s/g, ''))
                .attr("x1", villes.getVille(d.depart).getX(projection))
                .attr("y1",villes.getVille(d.depart).getY(projection))
                .attr("x2",villes.getVille(d.arrivee).getX(projection))
                .attr("y2",villes.getVille(d.arrivee).getY(projection))
        });
    }

    displayAvions(svg, villes, projection) {
        trajets.trajetsAvion.forEach(function (d) {
            svg.append("line")
                .attr("class","allLines")
                .attr("stroke","#686868")
                .attr("stroke-width","0.5")
                .attr("id",city.replace(/\s/g, '')+dict[city][i].replace(/\s/g, ''))
                .attr("x1", villes.getVille(d.depart).getX(projection))
                .attr("y1",villes.getVille(d.depart).getY(projection))
                .attr("x2",villes.getVille(d.arrivee).getX(projection))
                .attr("y2",villes.getVille(d.arrivee).getY(projection))
        });
    }
}
