//----------------------------------------------------------------
// Description des classes concernant les villes.
//----------------------------------------------------------------



/**
 * Définit une ville par son nom. Pour simplifier, le nom est enregistré en minuscule.
 * Les villes adjacentes (i.e. les villes accessibles depuis l'instance),
 * sont enregistrées dans des tableaux associatifs
 */
class Ville {

    constructor (nom, pos) {
        this.nom = nom.toUpperCase();
        this.pos = pos; // les coordonnées terrestres
        this.villesAdjVoiture =  []; // tableau associatif des villes accessibles (adjacentes) en voiture.
        this.villesAdjTrain =  []; // tableau associatif des villes accessibles (adjacentes) en Train.
        this.villesAdjAvion =  []; // tableau associatif des villes accessibles (adjacentes) en Avion.
    }

    /**
     * retourne la coordonnée x dans le SVG d'après la projection
     * @param projection la projection du svg
     * @returns { int}
     */
    getX(projection) {
        return projection(this.pos)[0];
    }

    /**
     * retourne la coordonnée y dans le SVG d'après la projection
     * @param projection la projection du svg
     * @returns { int }
     */
    getY(projection) {
        return projection(this.pos)[1];
    }


    /**
     * Ajoute une ville accessible en voiture
     * @param trajet : le trajet correspondant entre l'instance et la ville accessible.
     */
    addVilleAdjVoiture (trajet) {
        var destination;
        if (trajet.depart.toUpperCase() == this.nom)
        { destination = trajet.arrivee; }
        else if (trajet.arrivee.toUpperCase() == this.nom)
        { destination = trajet.depart; }
        else
        {return;}
        this.villesAdjVoiture.push(destination.toUpperCase());

    }

    /**
     * Ajoute une ville accessible en train
     * @param trajet : le trajet correspondant entre l'instance et la ville accessible.
     */
    addVilleAdjTrain (trajet) {
        var destination;
        if (trajet.depart.toUpperCase() == this.nom)
        { destination = trajet.arrivee; }
        else if (trajet.arrivee.toUpperCase() == this.nom)
        { destination = trajet.depart; }
        else
        {return;}
        this.villesAdjTrain.push(destination.toUpperCase());

    }

    /**
     * Ajoute une ville accessible en Avion
     * @param trajet : le trajet correspondant entre l'instance et la ville accessible.
     */
    addVilleAdjAvion (trajet) {
        var destination;
        if (trajet.depart.toUpperCase() == this.nom)
        { destination = trajet.arrivee; }
        else if (trajet.arrivee.toUpperCase() == this.nom)
        { destination = trajet.depart; }
        else
        {return;}
        this.villesAdjAvion.push(destination.toUpperCase());
    }

    listeVillesAdjacentes(){
        var liste= this.villesAdjVoiture.concat(this.villesAdjTrain).concat(this.villeAdjAvion);
        var uniqueArray = liste.filter(function(item, pos) {
            return liste.indexOf(item) == pos;
        })
        return uniqueArray;
    }
}


/**
 * Classe contenant un dictionnaire des villes
 */
class Villes {
    constructor() {
        this.villes = []
    }

    addVille(ville) {
        this.villes.push(ville);
    }

    getVille(nom) {
        for(var i=0; i<this.villes.length;i++){
            if(nom==this.villes[i].nom){
                return this.villes[i]
            }
        }
        return null;
    }
    getVilles(){
        return this.villes;
    }
}
