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
        this.Aprix = 0 ; //prix dépensé en avion
        this.Aduree = "0h0"; // temps passé en avion
        this.Aco2 = 0; // co2 émis en avion
        this.Tprix = 0 ; //prix dépensé en train
        this.Tduree = "0h0"; // temps passé en train
        this.Tco2 = 0; // co2 émis en train
        this.Vprix = 0 ; //prix dépensé en voiture
        this.Vduree = "0h0"; // temps passé en voiture
        this.Vco2 = 0; // co2 émis en voiture
    }
}