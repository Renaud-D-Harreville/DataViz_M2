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
    constructor(depart, arrivee, duree, prix, co2) {
        this.depart = depart.toUpperCase();
        this.arrivee = arrivee.toUpperCase();
        this.type = "";
        this.duree = duree;
        this.prix = prix;
        this.co2 = co2;
    }
}

/**
 * Un trajet en voiture
 */
class TrajetVoiture extends Trajet {
    constructor(depart, arrivee, duree, prix, co2) {
        super(depart,arrivee,"","","");
        this.type = "V";
        this.prix=parseFloat(prix);
        this.co2=parseFloat(co2);
        this.duree=duree;
        this.couleur = "#4848ff";
        this.legende = "voiture";
    }
}

/**
 * Un trajet en train
 */
class TrajetTrain extends Trajet {
    constructor(depart, arrivee, duree, prix, co2) {
        super(depart, arrivee, duree, prix, co2);
        this.type = "T";
        this.legende = "train";
        this.couleur = "#46ff49";
    }
}

/**
 * Un trajet en avion
 */
class TrajetAvion extends Trajet {
    constructor(depart, arrivee, duree, prix, co2){
        super(depart, arrivee, duree, prix, co2);
        this.type = "A";
        this.legende = "avion";
        this.couleur = "#ff213f";
    }
}

/**
 * Classe contenant tous les trajets. Ils sont organisés par type.
 */
class Trajets {
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

    getTrajets() {
        return this.trajetsAvion
            .concat(this.trajetsTrain)
            .concat(this.trajetsVoiture);
    }

    getTrajetEnTrain(depart,arrivee){
        if(depart<arrivee){
            var first=depart;
            var second=arrivee;
        }
        else{
            var first=arrivee;
            var second=depart;
        }
        for(i in this.trajetsTrain){
           if(this.trajetsTrain[i].depart==first && this.trajetsTrain[i].arrivee==second) {
               return this.trajetsTrain[i];
           }
        }
        return null;
    }

    getTrajetEnVoiture(depart,arrivee){
        if(depart<arrivee){
            var first=depart;
            var second=arrivee;
        }
        else{
            var first=arrivee;
            var second=depart;
        }
        for(i in this.trajetsVoiture){
           if(this.trajetsVoiture[i].depart==first && this.trajetsVoiture[i].arrivee==second) {
               return this.trajetsVoiture[i];
           }
        }
        return null;
    }

    getTrajetEnAvion(depart,arrivee){
        if(depart<arrivee){
            var first=depart;
            var second=arrivee;
        }
        else{
            var first=arrivee;
            var second=depart;
        }
        for(i in this.trajetsAvion){
           if(this.trajetsAvion[i].depart==first && this.trajetsAvion[i].arrivee==second) {
               return this.trajetsAvion[i];
           }
        }
        return null;
    }

    // retourne un dictionnaire avec tous les trajets possibles sans doublon
    // dictionnaire de la forme :
    // dict[ville]=[listeVilleAdjacentes] avec ville>villesAdjacentes
    trajetsPossibles(){
        var dict={}
        for(i in this.trajetsAvion){
            if( this.trajetsAvion[i].depart<this.trajetsAvion[i].arrivee ){
            // si on a deja dans le dict 
            if(dict[this.trajetsAvion[i].depart]!=undefined){
                // mais pas dans la liste 
                if(dict[this.trajetsAvion[i].depart].indexOf(this.trajetsAvion[i].arrivee)<=0){
                // on ajoute 
                dict[this.trajetsAvion[i].depart].push(this.trajetsAvion[i].arrivee)
                }
            }
            else{
                dict[this.trajetsAvion[i].depart]=[];
                dict[this.trajetsAvion[i].depart].push(this.trajetsAvion[i].arrivee)
            }
            }
            else{
            // si on a deja dans le dict 
            if(dict[this.trajetsAvion[i].arrivee]!=undefined){
                // mais pas dans la liste 
                if(dict[this.trajetsAvion[i].arrivee].indexOf(this.trajetsAvion[i].depart)<=0){
                // on ajoute 
                dict[this.trajetsAvion[i].arrivee].push(this.trajetsAvion[i].depart)
                }
            }
            else{
                dict[this.trajetsAvion[i].arrivee]=[];
                dict[this.trajetsAvion[i].arrivee].push(this.trajetsAvion[i].depart)
            }
            } 
        }
        for(i in this.trajetsTrain){
            if( this.trajetsTrain[i].depart<this.trajetsTrain[i].arrivee ){
            // si on a deja dans le dict 
            if(dict[this.trajetsTrain[i].depart]!=undefined){
                // mais pas dans la liste 
                if(dict[this.trajetsTrain[i].depart].indexOf(this.trajetsTrain[i].arrivee)<=0){
                // on ajoute 
                dict[this.trajetsTrain[i].depart].push(this.trajetsTrain[i].arrivee)
                }
            }
            else{
                dict[this.trajetsTrain[i].depart]=[];
                dict[this.trajetsTrain[i].depart].push(this.trajetsTrain[i].arrivee)
            }
            }
            else{
            // si on a deja dans le dict 
            if(dict[this.trajetsTrain[i].arrivee]!=undefined){
                // mais pas dans la liste 
                if(dict[this.trajetsTrain[i].arrivee].indexOf(this.trajetsTrain[i].depart)<=0){
                // on ajoute 
                dict[this.trajetsTrain[i].arrivee].push(this.trajetsTrain[i].depart)
                }
            }
            else{
                dict[this.trajetsTrain[i].arrivee]=[];
                dict[this.trajetsTrain[i].arrivee].push(this.trajetsTrain[i].depart)
            }
            } 
        }
        for(var i=0;i<this.trajetsVoiture.length;i++){
            if( this.trajetsVoiture[i].depart.toUpperCase()<this.trajetsVoiture[i].arrivee.toUpperCase() ){
            // si on a deja dans le dict 
            if(dict[this.trajetsVoiture[i].depart.toUpperCase()]!=undefined){
                // mais pas dans la liste 
                if(dict[this.trajetsVoiture[i].depart.toUpperCase()].indexOf(this.trajetsVoiture[i].arrivee.toUpperCase())<=0){
                // on ajoute 
                dict[this.trajetsVoiture[i].depart.toUpperCase()].push(this.trajetsVoiture[i].arrivee.toUpperCase())
                }
            }
            else{
                dict[this.trajetsVoiture[i].depart.toUpperCase()]=[];
                dict[this.trajetsVoiture[i].depart.toUpperCase()].push(this.trajetsVoiture[i].arrivee.toUpperCase())
            }
            }
            else{
            // si on a deja dans le dict 
            if(dict[this.trajetsVoiture[i].arrivee.toUpperCase()]!=undefined){
                // mais pas dans la liste 
                if(dict[this.trajetsVoiture[i].arrivee.toUpperCase()].indexOf(this.trajetsVoiture[i].depart.toUpperCase())<=0){
                // on ajoute 
                dict[this.trajetsVoiture[i].arrivee.toUpperCase()].push(this.trajetsVoiture[i].depart.toUpperCase())
                }
            }
            else{
                dict[this.trajetsVoiture[i].arrivee.toUpperCase()]=[];
                dict[this.trajetsVoiture[i].arrivee.toUpperCase()].push(this.trajetsVoiture[i].depart.toUpperCase())
            }
            } 
        }
        delete dict["undefined"]
        return (dict)
        }
}
