//----------------------------------------------------------------
// Fichier contenant les descriptions des objets se rapportant aux joueurs.
//----------------------------------------------------------------



/**
 * Classe contenant la liste des joueurs
 */
class AllJoueurs {

    constructor () {
        this.players = [];
    }

    addPlayer(joueur) {
        this.players[joueur.name] = joueur;
    }

    getJoueur(name) { return this.players[name]; }
}


/**
 * définit un joueur, son placement sur la carte ainsi que ses actions faites au cours du jeu.
 */
class Joueur {

    constructor(name, start){
        this.name = name; // name est l'identifiant du joueur.
        this.monnaie = 500; //somme de départ en euros
        this.start = start || "";
        this.currentPlace = start || "";
        this.actions = [];
    }
}


/**
 * Définit une action faite par un joueur
 */
class ActionsJoueur {
    constructor () {
        //TODO
    }
}