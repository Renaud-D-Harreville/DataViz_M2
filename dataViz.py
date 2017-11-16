
import requests
import json
import pickle


villes = ["Lyon", "Paris", "Marseille", "Lille", "Strastbourg", "Brest", "Toulouse", "Montpellier", "Bordeaux", \
          "Clermond-Ferrand", "Grenoble", "Annecy", "Le Mans", "Nancy", "Besancon"]

params = {
        # 'accept': "application/json",
        # 'key': "ac86e06f0fcc4dacb7cfe7d193f7a723",
        'locale': "fr_FR",
        '_format': "json",
        #'fn': "Paris",
        #'tn': "Lyon",
        'cur': "EUR",
        #'limit': "2",
        'radius': "10",
        # 'radius_from': "15",
        # 'radius_to': "15",
    }

class Trajet:


    def __init__(self, start, end):
        self.start = start
        self.end = end
        self.allCovoits = AllCovoits()

    def _create_request(self):
        params_r = params
        params_r["fn"] = self.start
        params_r["tn"] = self.end
        r = requests.get("https://public-api.blablacar.com/api/v2/trips", params=params_r, headers={'content-type': 'application/json', 'accept': "application/json", 'key': "ac86e06f0fcc4dacb7cfe7d193f7a723",})
        return r

    def get_response(self):
        req = self._create_request()
        if int(req.status_code) >= 400:
            print("Erreur " + str(req.status_code) + " sur la réponse pour le trajet : " + self.__str__() + "\n" +\
                  str(req.text))
            return -1
        else:
            self.allCovoits.add_covoit_from_response(req.json()["trips"])
            return req.json()["trips"]

    def __str__(self):
        return "(" + self.start + " -> " + self.end +")"


class AllTrajets:

    def __init__(self, villes):
        self.villes = villes
        self.trajets = []
        for i in range(len(villes)-1):
            for j in range(i+1, len(villes)):
                self.trajets.append(Trajet(villes[i], villes[j]))
                self.trajets.append(Trajet(villes[j], villes[i]))
        print(len(self.trajets))

    def faire_requetes(self):
        for t in self.trajets:
            t.get_response()


class Covoit:

    def __init__(self, values):
        self.id = values["permanent_id"]
        self.data = values

class AllCovoits:

    def __init__(self):
        self.covoiturages = {}

    def add_covoit(self, covoit:Covoit):
        print(covoit.id)
        self.covoiturages[str(covoit.id)] = covoit.data

    def add_covoit_from_response(self, covoits:[]):
        for _ in covoits:
            self.add_covoit(Covoit(_))


with open('donnees', 'rb') as fichier:
    mon_depickler = pickle.Unpickler(fichier)
    at = mon_depickler.load()

#covoits = AllCovoits()

#at = AllTrajets(villes)
#print(at)
at.faire_requetes()


with open('donnees', 'wb') as fichier:
    mon_pickler = pickle.Pickler(fichier)
    mon_pickler.dump(at)



