const { Reservation } = require("../model/Reservation.js")
const client = require("../bd/connect");
const { ObjectId } = require("mongodb");

const ajouterReservation = async (req, res)=>{
    try{
        let reservation = new Reservation(new ObjectId(req.body.idCar), req.body.nombreDeJour,new ObjectId(req.body.idUser), req.body.jourDepart, req.body.jourArrive, req.body.prixTotal);

        let result = await client.bd().collection("reservation").insertOne(reservation);

        res.status(200).json({
            msg: "Ajout réussi !"
        });

    }catch(error){
        console.log(error);
        res.status(500).json(error);

}
};

const getTousReservation = async (req, res) => {
    try {
        const agg = [
            {
              '$lookup': {
                'from': 'car', 
                'localField': 'idCar', 
                'foreignField': '_id', 
                'as': 'cars'
              }
            },
            {
                '$lookup': {
                  'from': 'utilisateur', 
                  'localField': 'idUser',  
                  'foreignField': '_id', 
                  'as': 'utilisateurs'
                }
              },
            
          ];
        const coll = client.bd().collection('reservation');
        const cursor = coll.aggregate(agg);
        const result = await cursor.toArray();
        if(result.length > 0) {
            res.status(200).json(result);
        }
        else{
            res.status(204).json({msg: "Aucune réservation trouvée"})
        }
        
    } catch (error) {
        console.log(error) ;
        res.status(500).json(error);
    }
};

const getReservation = async (req, res) => {
    try {

        let id  = new ObjectId(req.params.id);  

        const agg = [
            {
                '$match': { 'idUser': id }
            },
            {
                
              '$lookup': {
                'from': 'car', 
                'localField': 'idCar', 
                'foreignField': '_id', 
                'as': 'cars'
              }
            },
            {
                '$lookup': {
                  'from': 'utilisateur', 
                  'localField': 'idUser',  
                  'foreignField': '_id', 
                  'as': 'utilisateurs'
                }
              },
            
          ];
          
        const coll = client.bd().collection("reservation");
        const cursor = coll.aggregate(agg);
        const result = await cursor.toArray();
        if(result.length > 0) {
            res.status(200).json(result);
        }
        else{
            res.status(204).json({msg: "Aucune réservation trouvée"})
        }
        
    } catch (error) {
        console.log(error) ;
        res.status(500).json(error);
    }
};

const modifierReservation = async (req, res)=>{
     try {
        let id = new ObjectId(req.params.id);
        let nIdCar = new ObjectId(req.body.idCar);
        let nNombreDeJour = req.body.nombreDeJour;
        let nIdUser = new ObjectId(req.body.idUser);
        let nJourDepart = req.body.jourDepart;
        let nJourArrive = req.body.jourArrive;
        let nPrixTotal = req.body.prixTotal;
        

        let result = await client.bd().collection("reservation").updateOne({_id : id}, {$set : {idCar : nIdCar, nombreDeJour : nNombreDeJour, idUser : nIdUser, jourDepart : nJourDepart, jourArrive : nJourArrive, prixTotal : nPrixTotal}});
        if(result.modifiedCount==1){
            res.status(200).json({msg : "Modification réussie"});
        }
        else{
            res.status(404).json({msg: "Cette réservation n'existe pas"});
        }
        
     } catch (error) {
        console.log(error) ;
        res.status(500).json(error);
     }
};

const supprimerReservation = async (req, res)=>{
    try {
       let id = new ObjectId(req.params.id);

       let result = await client.bd().collection("reservation").deleteOne({_id : id});

       if(result.deletedCount==1){
        res.status(200).json({msg : "suppression réussie"});
       }
       else{
        res.status(404).json({msg: "Cette réservation n'existe plus"});
       }
       
       
    } catch (error) {
       console.log(error) ;
       res.status(500).json(error);
    }
};

module.exports = {ajouterReservation, getTousReservation, getReservation, modifierReservation, supprimerReservation};