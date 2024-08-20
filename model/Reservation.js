class Reservation{
    constructor(idCar, nombreDeJour, idUser, jourDepart, jourArrive, prixTotal){
        this.idCar = idCar;
        this.nombreDeJour = nombreDeJour;
        this.idUser = idUser;
        this.jourDepart = jourDepart;
        this.jourArrive = jourArrive;
        this.prixTotal = prixTotal;
    }
}

module.exports = { Reservation };