class Rented{
    constructor(idCar, nombreDeJour, idUser, status, jourDepart, jourArrive, prixTotal){
        this.idCar = idCar;
        this.nombreDeJour = nombreDeJour;
        this.idUser = idUser;
        this.status = status;
        this.jourDepart = jourDepart;
        this.jourArrive = jourArrive;
        this.prixTotal = prixTotal;
    }
}

module.exports = { Rented };