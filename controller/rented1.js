const { Rented } = require("../model/Rented")
const { Car } = require("../model/Car")
const client = require("../bd/connect");
const { ObjectId } = require("mongodb");

const ajouterRented = async (req, res)=>{
    try{
        let rented = new Rented(new ObjectId(req.body.idCar), req.body.nombreDeJour,new ObjectId(req.body.idUser), req.body.status, req.body.jourDepart, req.body.jourArrive, req.body.prixTotal);

        let result = await client.bd().collection("rented").insertOne(rented);

        res.status(200).json({msg: "ajout réussi"});

    }catch(error){
        console.log(error);
        res.status(500).json(error);

}
}

const getTousRented = async (req, res) => {
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
        const coll = client.bd().collection('rented');
        const cursor = coll.aggregate(agg);
        const result = await cursor.toArray();
        if(result.length > 0) {
            res.status(200).json(result);
        }
        else{
            res.status(204).json({msg: "Aucune voiture louée trouvée"})
        }
        
    } catch (error) {
        console.log(error) ;
        res.status(500).json(error);
    }
};


const getRented = async (req, res) => {
    try {
        
        let id  = new ObjectId(req.params.id);  
        let cursor  = client.bd().collection("rented").find({_id: id});
        let result = await cursor.toArray();
        if(result.length > 0) {
            res.status(200).json([result]);
        }
        else{
            res.status(203).json({msg: "Cette voiture n'est plus louée"});
        }
        
    } catch (error) {
        console.log(error) ;
        res.status(500).json(error);
    }
};

const modifierRented = async (req, res)=>{
     try {
        let id = new ObjectId(req.params.id);
        let nIdCar = req.body.idCar;
        let nNombreDeJour = req.body.nombreDeJour;
        let nIdUser = req.body.idUser;
        let nStatus = req.body.status;
        let nJourDepart = req.body.jourDepart;
        let nJourArrive = req.body.jourArrive;
        let nPrixTotal = req.body.prixTotal;

        let result = await client.bd().collection("rented").updateOne({_id : id}, {$set : {idCar : nIdCar, nombreDeJour : nNombreDeJour, idUser : nIdUser, status : nStatus, jourDepart : nJourDepart, jourArrive : nJourArrive, prixTotal : nPrixTotal}});
        if(result.modifiedCount==1){
            res.status(200).json({msg : "Modification réussie"});
        }
        else{
            res.status(404).json({msg: "Modification impossible"});
        }
        
     } catch (error) {
        console.log(error) ;
        res.status(500).json(error);
     }
};

const RentedCar = async (req, res) => {
    try {
        let id = new ObjectId(req.params.id);
        let nstatus = "Pris";
        let result = await client.bd().collection("rented").updateOne({_id : id}, {$set : {status : nstatus}}) 
        if(result.modifiedCount==1){
            res.status(200).json({msg : "Modification réussie"});
        }
        else{
            res.status(404).json({msg: "Modification impossible"});
        }
    } catch (error) {
        console.log(error) ;
        res.status(500).json(error);
    }
};

const UnRentedCar = async (req, res) => {
    try {
        let id = new ObjectId(req.params.id);

        let nstatus = "Disponible";
        let result = await client.bd().collection("rented").updateOne({_id : id}, {$set : {status : nstatus}}) 
        if(result.modifiedCount==1){
            res.status(200).json({msg : "Modification réussie"});
        }
        else{
            res.status(404).json({msg: "Modification impossible"});
        }
    } catch (error) {
        console.log(error) ;
        res.status(500).json(error);
    }
};

const supprimerRented = async (req, res)=>{
    try {
       let id = new ObjectId(req.params.id);

       let result = await client.bd().collection("rented").deleteOne({_id : id});

       if(result.deletedCount==1){
        res.status(200).json({msg : "suppression réussie"});
       }
       else{
        res.status(404).json({msg: "Cette voiture n'existe plus"});
       }
       
       
    } catch (error) {
       console.log(error) ;
       res.status(500).json(error);
    }
};

module.exports = {ajouterRented, getTousRented, getRented , modifierRented, supprimerRented, RentedCar,UnRentedCar };