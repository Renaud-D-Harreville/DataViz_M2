//----------------------------------------------------------------
// Fichier contenant les descriptions des objets se rapportant aux scores d'un joueur.
//----------------------------------------------------------------

/**
 * Classe contenant la liste des scores
 */
class Scores {

    constructor () {
        this.scores = [];
    }

    addScore(score) {
        this.scores[score.id] = score;
    }

    getScore(id) { return this.scores[id]; }
}


/**
 * définit un score, le nombre de trajets, le type, la durée, le prix, l'émission de co2
 */
class Score {

    constructor(id){
        this.id = id;
        this.A = [];
        this.A.prix = 0; //prix dépensé en avion
        this.A.duree = "0h0"; // temps passé en avion
        this.A.co2 = 0; // co2 émis en avion
        this.T = [];
        this.T.prix = 0 ; //prix dépensé en train
        this.T.duree = "0h0"; // temps passé en train
        this.T.co2 = 0; // co2 émis en train
        this.V = [];
        this.V.prix = 0 ; //prix dépensé en voiture
        this.V.duree = "0h0"; // temps passé en voiture
        this.V.co2 = 0; // co2 émis en voiture
    }
}