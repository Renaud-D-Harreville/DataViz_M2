text_file = open("voitures", "r")

aecrire=""
first=True
for line in text_file:
    array=line.split(',')
    if not first:
        if int(array[3].split('h')[0])<5 : # si le trajet dure moins de 5h
            prix=(int(array[5])+int(array[6].split(" ")[0])/100)/2
            if array[0]<array[1]:
                aecrire+=array[0]+","+array[1]+","+array[3]+","+str(prix)+","+str(float(array[4].split(" ")[0])*120/1000/2)+"\n"
            else:
                aecrire+=array[1]+","+array[0]+","+array[3]+","+str(prix)+","+str(float(array[4].split(" ")[0])*120/1000/2)+"\n"
    first=False

new_file= open("voiture.csv","w")
new_file.write(aecrire)
#depart,arrivee,temps,prix,CO2
