//----------------------------------------------------------------
// Fichier contenant les descriptions des objets se rapportant aux joueurs.
//----------------------------------------------------------------

/**
 * Classe contenant la liste des players
 */
class Joueurs {

    constructor () {
        this.joueurs = [];
    }

    addJoueur(joueur) {
        this.joueurs[joueur.id] = joueur;
    }

    getJoueur(id) { return this.joueurs[id]; }
}


/**
 * définit un player, son placement sur la carte ainsi que ses actions faites au cours du jeu.
 */
class Joueur {

    constructor(id, depart){
        this.id = id;
        this.prix = 0 ; // prix dépensé en euros
        this.co2 = 0 ; // co2 dépensé en kg
        this.temps = "0h0" ; // temps dépensé en heure, minutes
        this.position = depart ; // position du joueurs
        this.actions = []; // historique des trajets du joueurs, liste de trajets
    }
}