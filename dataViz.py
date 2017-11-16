
import requests
import json


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
        'limit': "2",
        'radius': "10",
        # 'radius_from': "15",
        # 'radius_to': "15",
    }

class Trajet:


    def __init__(self, start, end):
        self.start = start
        self.end = end

    def _create_request(self):
        params_r = params
        params_r["fn"] = self.start
        params_r["tn"] = self.end
        r = requests.get("https://public-api.blablacar.com/api/v2/trips", params=params_r, headers={'content-type': 'application/json', 'accept': "application/json", 'key': "ac86e06f0fcc4dacb7cfe7d193f7a723",})
        return r

    def get_response(self):
        req = self._create_request()
        if int(req.status_code) >= 400:
            print("Erreur " + req.status_code+ " sur la réponse pour le trajet : " + self.__str__() + "\n" +\
                  req.text)
        else:
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


at = AllTrajets(villes)
#print(at)

voyage = Trajet(villes[0], villes[1])
res = voyage.get_response()
print(len(res))
#print(str(voyage.get_response()))





