//----------------------------------------------------------------
// Description des classes concernant les villes.
//----------------------------------------------------------------



/**
 * Définit une ville par son nom. Pour simplifier, le nom est enregistré en minuscule.
 * Les villes adjacentes (i.e. les villes accessibles depuis l'instance),
 * sont enregistrées dans des tableaux associatifs
 */
class Ville {

    constructor (name, pos) {
        this.name = name.toLowerCase();
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
