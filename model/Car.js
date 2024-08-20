class Car{
    constructor(model, marque, type, about, prix, nombreDePlace, consommation, couleur, boiteDeVitesse, status,note, img, imgC, img1, img2, img3){
        this.model = model;
        this.marque = marque;
        this.type = type;
        this.about = about;
        this.prix = prix;
        this.nombreDePlace = nombreDePlace;
        this.consommation = consommation;
        this.couleur =  couleur;
        this.boiteDeVitesse = boiteDeVitesse;
        this.status =  status;
        this.note = note;
        this.img = img;
        this.imgC = imgC;
        this.img1 =img1;
        this.img2 = img2;
        this.img3 = img3;
    }
}

module.exports = { Car };